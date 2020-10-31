<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="开启状态">
        <el-switch
          v-model="form.status"
          active-text="开"
          inactive-text="关">
        </el-switch>
      </el-form-item>
      <el-form-item label="最低提现金额">
        <el-input-number size="small" v-model="form.minPrice" controls-position="right" :step="1" precision="2" @change="handleChange" :min="0"></el-input-number> 元
      </el-form-item>
      <el-form-item label="提现倍数">
        <el-input-number size="small" v-model="form.multiple" controls-position="right" :step="1" @change="handleChange" :min="1"></el-input-number> 倍
      </el-form-item>
      <el-form-item label="提现提示信息">
        <el-input v-model="form.tips" placeholder="" class="w-200"></el-input>
      </el-form-item>
      <el-form-item label="提现账户">
        <el-checkbox-group v-model="form.outType">
          <el-checkbox label="1">微信</el-checkbox>
          <el-checkbox label="2">支付宝</el-checkbox>
          <el-checkbox label="3" disabled>银行卡</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存设置</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'priceOut',
  data() {
    return {
      form: {
        status:0,
        tips:'',
        outType:['0','1'],
        MSG_KEY:'',
        toggle:'1',
        minPrice: 0,
        multiple: 1
      },
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
