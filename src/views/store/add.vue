<template>
  <div>
    <el-form :model="form" class="mt-10">
      <el-form-item label="会员账号" :label-width="formLabelWidth">
        <el-input v-model="form.name" size="small" autocomplete="off" class="w-200"></el-input>
      </el-form-item>
      <el-form-item label="会员密码" :label-width="formLabelWidth">
        <el-input show-password v-model="form.name" size="small" autocomplete="off" class="w-200"></el-input>
      </el-form-item>
      <el-form-item label="店铺名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" size="small" autocomplete="off" class="w-200"></el-input>
      </el-form-item>
      <el-form-item label="所属分类" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属等级" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域" size="small">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年费" :label-width="formLabelWidth">
        <el-input-number size="small" v-model="form.name" controls-position="right" :precision="2" :min="0" class="w-200"></el-input-number>
        元/年
      </el-form-item>
      <el-form-item label="账户类型" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域" size="small">
          <el-option label="银行卡" value="bank"></el-option>
          <el-option label="支付宝" value="alipay"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支行信息" :label-width="formLabelWidth">
        <el-input v-model="form.name" size="small" autocomplete="off" class="w-200"></el-input>
      </el-form-item>
      <el-form-item label="账号信息" :label-width="formLabelWidth">
        <el-input v-model="form.name" size="small" autocomplete="off" class="w-200"></el-input>
      </el-form-item>
      <el-form-item label="联系姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" size="small" autocomplete="off" class="w-200"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" :label-width="formLabelWidth">
        <el-input v-model="form.name" size="small" autocomplete="off" class="w-200"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth:'120px'
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
