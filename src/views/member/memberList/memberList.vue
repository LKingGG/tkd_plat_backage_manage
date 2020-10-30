<template>
  <div>
    <div class="mt-10 mb-10 overflow">
      <div class="f-l">
        <el-button type="primary" size="small" @click="dialogVisible = true">添加会员</el-button>
      </div>
      <div class="f-r">

        <el-button type="primary" size="small" @click="search">搜索</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="会员"
        align="center"
        width="280">
        <template slot-scope="scope">
          <div class="overflow">
            <div class="f-l w-100" style="padding-top: 20px;">
              <!-- <img src="" alt=""> -->
              <i class="el-icon-picture-outline-round" style="font-size: 50px;"></i>
            </div>
            <div class="f-l w-150">
              <p class="padding-0">昵称：1234567890</p>
              <p>手机：0123456789</p>
              <p class="padding-0">邮箱：--</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="会员等级"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="积分"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="账号余额"
        width="120">
      </el-table-column>
      <el-table-column
        label="注册&登录"
        align="center">
        <template slot-scope="scope">
          <span>￥99999.99</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="状态"
        width="120"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.address?'正常':'异常'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <p class="padding-0 margin-0">
            <el-button type="text">账号明细</el-button>
          </p>
          <p class="padding-0 margin-0"><el-button type="text">积分调整</el-button> <el-button type="text">余额调整</el-button></p>
          <p class="padding-0 margin-0"><el-button type="text">设置锁定</el-button> <el-button type="text">重置密码</el-button></p>
          <p class="padding-0 margin-0"><el-button type="text">查看足迹</el-button> <el-button type="text">修改</el-button> <el-button type="text">删除</el-button></p>
        </template>
      </el-table-column>
    </el-table>
    <div>

    </div>
    <el-dialog
      title="添加会员"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="会员等级">
          <el-select v-model="form.region" placeholder="请选择会员等级">
            <el-option label="初级会员" value="shanghai"></el-option>
            <el-option label="中级会员" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="保密" name="type"></el-checkbox>
            <el-checkbox label="男" name="type"></el-checkbox>
            <el-checkbox label="女" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="正常"></el-radio>
            <el-radio label="锁定"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">创 建</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
        dialogVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      };
    },
    mounted() {

    },
    methods: {

    },
  };
</script>

<style>
</style>
