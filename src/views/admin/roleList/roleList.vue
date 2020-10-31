<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">新增角色</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="角色名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最近更新时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.updatedTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.createdTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination :total="pagetotal" layout="total, prev, pager, next" :page-count="pageCount" @current-change="handleCurrentChange" />
    </div>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="角色名称">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="权限树">
          <el-tree
            ref="tree"
            :data="treeList"
            show-checkbox
            node-key="path"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="text" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">{{ dialogType==='edit'?'修改':'添加' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
/* import {getRolesList, deleteRole, saveRole, getRole } from '@/api/role' */

const defaultRole = {
  name: '',
  id: 0,
  permission: [],
  routes: []
}

export default {
  data() {
    return {
      search: '',
      nowPage: 1,
      pageCount: 1, // 总页数
      pagetotal: 0, // 数据量
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      treeList: [],
      trees: []
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoles()
    this.treeList = require('./treeList.json')
    this.trees = JSON.parse(JSON.stringify(this.treeList))
  },
  methods: {
    handleCurrentChange(page) { // 分页跳转
      this.nowPage = page
      this.getRoles()
    },
    async getRoles() {
      const data = {}
      data.page = this.nowPage
      data.limit = 10
      if (this.search) {
        data.search = this.search
      }
      const res = await getRolesList(data)
      if (res.state === 0) {
        this.rolesList = res.data.list
        this.pageCount = res.data.pages
        this.pagetotal = res.data.total
      } else {
        this.$message(res.message)
      }
    },

    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title

        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.treeList = JSON.parse(JSON.stringify(this.trees))
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      console.log(scope)
      getRole({ id: scope.row.id }).then(res => {
        console.log(res)
        if (res.state === 0) {
          this.role.id = scope.row.id
          this.role.name = res.data.name
          // this.$refs.tree.setCheckedNodes(JSON.parse(res.data.permission))
          const obj = JSON.parse(res.data.permission)

          obj.forEach((item1, i1) => {
            item1.children.forEach((item2, i2) => {
              this.$refs.tree.setChecked(item2.path, true)
            })
          })
          // this.$refs.tree.setCheckedNode()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定要删除该角色吗?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const data = { id: row.id }
          await deleteRole(data)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      const checkedKeys = this.$refs.tree.getCheckedNodes()
      const treeTemp = {}
      checkedKeys.forEach((item1, index1) => {
        const item1Path = item1.path.split('.')
        if (item1Path.length === 2) {
          // CHILD
          if (!treeTemp['temp' + item1Path[0]]) {
            treeTemp['temp' + item1Path[0]] = this.treeList[parseInt(item1Path[0] - 1)]
            treeTemp['temp' + item1Path[0]].children = []
          }
          treeTemp['temp' + item1Path[0]].children.push(item1)
        } else if (item1Path.length === 1) {
          if (!treeTemp['temp' + item1Path[0]]) {
            treeTemp['temp' + item1Path[0]] = this.treeList[parseInt(item1Path[0] - 1)]
            treeTemp['temp' + item1Path[0]].children = []
          }
        }
      })
      const permissions = []
      for (const key in treeTemp) {
        permissions.push(treeTemp[key])
      }

      console.log(this.$refs.tree)
      this.role.permission = JSON.stringify(permissions)
      console.log('isEdit:', isEdit)
      if (isEdit) {
        const res = await saveRole(this.role)
        if (res.state === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
        this.getRoles()
      } else {
        console.log(this.role)
        const res = await saveRole(this.role)
        console.log(res)
        if (res.state === 0) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
        this.getRoles()
      }

      // const { description, key, name } = this.role
      this.dialogVisible = false
      // this.$notify({
      //   title: 'Success',
      //   dangerouslyUseHTMLString: true,
      //   message: `
      //       <div>Role Key: ${key}</div>
      //       <div>Role Name: ${name}</div>
      //       <div>Description: ${description}</div>
      //     `,
      //   type: 'success'
      // })
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
