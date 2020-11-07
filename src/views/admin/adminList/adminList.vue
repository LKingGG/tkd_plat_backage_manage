<template>
  <div>
    <div class="mt-10">
      <el-button type="primary" @click="add">新增管理员</el-button>
    </div>
    <el-table :data="tableList" style="width: 100%;margin-top:20px;" border>
      <el-table-column align="center" label="管理员账号">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="登录账号" width="200">
        <template slot-scope="scope">
          {{ scope.row.updatedTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.createdTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属角色" width="200">
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
    <el-dialog :visible.sync="dialogVisible" width="30%" :title="dialogType==='edit'?'Edit Role':'New Role'">
      <el-form :model="form" label-width="100px" label-position="left">
        <el-form-item label="管理员账号">
          <el-input v-model="form.name" placeholder="Admin Name" />
        </el-form-item>
        <el-form-item label="管理员密码">
          <el-input placeholder="请输入密码" v-model="form.pwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="选择角色">
          <el-select v-model="form.role" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
export default {
  name: '',
  data() {
    return {
      tableList: [],
      dialogType: 'add',
      dialogVisible: false,
      form:{
        name:'',
        pwd:'',
        role:''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
    }
  },
  mounted() {

  },
  methods: {
    add() {
      this.dialogType = 'add'
      this.dialogVisible = true
    },
    handleEdit() {
      this.dialogType = 'edit'
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped="">
</style>
