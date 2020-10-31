<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        align="center"
        label="通知类型">
        <template slot-scope="scope">
          <div class="overflow" align="left">
            <div class="f-l mt-20 mr-20">
              <img :src="scope.row.icon" alt="" width="55">
            </div>
            <div class="f-l">
              <p>{{scope.row.type}}</p>
              <p>提示：{{scope.row.tips}}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="状态"
        width="200"
        align="center">
        <template slot-scope="scope">
          <i class="el-icon-success c-blue" style="font-size: 22px;"></i>
          <i class="el-icon-close-notification" style="font-size: 22px;"></i>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="240"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="dialogVisible = true">配置</el-button>
          <el-button type="text">开启</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="配置"
      :visible.sync="dialogVisible"
      width="33%">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="开启状态">
          <el-switch
            v-model="form.status"
            active-text="开"
            inactive-text="关">
          </el-switch>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.APP_KEY" placeholder="支付宝账户"></el-input>
        </el-form-item>
        <el-form-item label="合作者身份ID">
          <el-input v-model="form.SECRET_KEY" placeholder="支付宝合作者身份ID(PID)"></el-input>
        </el-form-item>
        <el-form-item label="安全校检码">
          <el-input v-model="form.MSG_KEY" placeholder="支付宝老版MD5密钥"></el-input>
        </el-form-item>
        <el-form-item label="是否启用退款">
          <el-radio-group v-model="form.toggle" size="small">
            <el-radio-button label="1">否</el-radio-button>
            <el-radio-button label="2">是</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否启用转账">
          <el-radio-group v-model="form.toggle" size="small">
            <el-radio-button label="1">否</el-radio-button>
            <el-radio-button label="2">是</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="text" class="mr-10">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'paySet',
  data() {
    return {
      tableData: [
        {
          icon: require('../../../assets/alipay.png'),
          type: '支付宝支付',
          status: 0,
          tips: '该系统支持随时到账接口'
        },
        {
          icon: require('../../../assets/wxpay.png'),
          type: '微信支付',
          status: 0,
          tips: '该系统支持微信网页支付和扫码支付'
        }
      ],
      dialogVisible: false,
      form: {
        status:0,
        APP_KEY:'',
        SECRET_KEY:'',
        MSG_KEY:'',
        toggle:'1'
      },
      modelProp:false,
      model: {
        modelID: '',
        KEY: ''
      }
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped="">
</style>
