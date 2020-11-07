<template>
  <div>
    <div class="mt-10">
      <el-button size="small" type="primary">添加商品分类</el-button>
    </div>
    <el-table
        :data="tableData1"
        style="width: 100%"
        class="mt-10"
        row-key="id"
        border
        lazy
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="date"
          label="分类名称"
          width="250">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="outTable">输出表格数据</el-button>
      <div>{{tableData1}}</div>
    </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        tableData1: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          hasChildren: true
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          hasChildren: true
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    mounted(){

    },
    methods:{
      load(tree, treeNode, resolve) {
        console.log(tree)
        console.log(treeNode)
        console.log(resolve)
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              hasChildren: true
            }
          ])
        }, 500)
      },
      outTable(){
        console.log(this.tableData1)
      }
    }
  }
</script>

<style>
</style>
