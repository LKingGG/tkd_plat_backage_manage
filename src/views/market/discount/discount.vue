<template>
  <div>
    <div class="mt-10">
      <el-button type="primary" @click="add">添加限时折扣</el-button>
    </div>
    <el-table :data="tableList" style="width: 100%;margin-top:20px;" border>
      <el-table-column align="center" label="活动名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属商家" width="200">
        <template slot-scope="scope">
          {{ scope.row.updatedTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动状态" width="200">
        <template slot-scope="scope">
          {{ scope.row.createdTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="有效时间" width="200">
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
    <el-dialog :visible.sync="dialogVisible" width="50%" :title="dialogType==='edit'?'Edit':'New'">
      <el-form :model="form" label-width="120px" label-position="left">
        <el-form-item label="活动名称">
          <el-input v-model="form.name" placeholder="请输入活动名称" />
        </el-form-item>
        <el-form-item label="活动有效时间">
          <el-date-picker
            v-model="form.timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="选择商品" size="mini">
          <el-button type="primary" size="mini" @click="dialogSelGoods = true">选择商品</el-button>
        </el-form-item>
        <el-table
          :data="selGoodsList"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            label="日期"
            width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" class="c-red" @click="selGoodsList.splice(scope.$index,1)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div style="text-align:right;">
        <el-button type="text" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">{{ dialogType==='edit'?'修改':'添加' }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogSelGoods" width="50%" title="选择商品">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div style="text-align:right;">
        <el-button type="text" @click="dialogSelGoods = false">取消</el-button>
        <el-button type="primary" @click="addGoodsBtn">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'discount',
  data() {
    return {
      tableList: [],
      dialogType: 'add',
      dialogVisible: false,
      form:{
        name:'',
        pwd:'',
        role:'',
        type:'0'
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: [],
      dialogSelGoods: false,
      selGoodsList: []
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
    },
    handleSelectionChange(val) { // 多选
      this.multipleSelection = val;
    },
    addGoodsBtn() { // 添加商品
      let json=this.selGoodsList.concat(this.multipleSelection)
      let arr = Array.from(new Set(json))
      console.log(arr)
      this.selGoodsList = arr
      this.dialogSelGoods = false
      this.multipleSelection = []
    }
  }
}
</script>

<style scoped="">
</style>
