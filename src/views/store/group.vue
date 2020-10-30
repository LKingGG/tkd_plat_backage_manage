<template>
  <div>
    <div class="mt-10 overflow">
      <el-input size="small" placeholder="请输入分组名称" class="w-150 mr-10"></el-input>
      <el-button size="small">搜索</el-button>
      <div class="f-r">
        <el-button size="small" @click="dialogVisible = true" type="primary" class="el-icon-plus"> 添加分组</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          align="center"
          label="店铺ID">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="店铺名称">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="账户">
        </el-table-column>
        <el-table-column
          prop="date"
          align="center"
          label="有效期">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="是否推荐">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="排序">
        </el-table-column>
        <el-table-column
          align="center"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" style="color: limegreen;">已开启</span>
            <span v-else style="color:orangered">已关闭</span>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" class="mr-10">修改</el-button>
            <el-button type="text" class="c-red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-count="100"
        layout="total, prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
    <el-dialog
      title="添加分组"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="分组名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" size="small" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input-number size="small" v-model="form.name" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name:'StoreGroup',
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
        value: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 0
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          status: 1
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          status: 0
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          status: 1
        }],
        currentPage: 5, // 当前页
        dialogVisible: false, // dialog
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          value: false,
        },
        formLabelWidth: '120px'
      };
    },
    mounted() {

    },
    methods: {
      changeStatus(row){
        row.status = 1
        this.$message({
          showClose: true,
          message: '操作成功，已关闭该店铺',
          type: 'success'
        });
      }
    },
  };
</script>

<style>
</style>
