<template>
  <div>
    <div class="mt-10 overflow">
      <el-input size="small" placeholder="请输入店铺名称" class="w-150 mr-10"></el-input>
      <el-button size="small" @click="dialogVisible = true">搜索</el-button>
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
            <el-popconfirm
              :title="scope.row.status == 0?'确定关闭店铺吗？':'确定开启店铺吗？'"
              @onConfirm="changeStatus(scope.row)"
            >
              <el-button type="text" slot="reference" class="mr-10">{{scope.row.status == 0?'关闭':'开启'}}</el-button>
            </el-popconfirm>
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
      title="添加店铺等级"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="等级名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input-number v-model="form.name" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="年费" :label-width="formLabelWidth">
          <el-input-number v-model="form.name" :precision="2" controls-position="right" :min="0"></el-input-number>
          元/年
        </el-form-item>
        <el-form-item label="是否自营" :label-width="formLabelWidth">
          <el-switch
            v-model="form.value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否">
          </el-switch>
        </el-form-item>
        <el-form-item label="等级状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开"
            inactive-text="关">
          </el-switch>
        </el-form-item>
        <el-form-item label="说明" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
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
    name:'StoreLevel',
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
