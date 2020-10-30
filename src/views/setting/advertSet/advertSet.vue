<template>
  <div>
    <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="广告列表" name="first">
          <div class="overflow">
            <div class="f-l">
              <el-radio-group v-model="platStatus" size="small">
                <el-radio-button label="1">PC端</el-radio-button>
                <el-radio-button label="2">手机端</el-radio-button>
              </el-radio-group>
            </div>
            <div class="f-r">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogVisible = true">添加广告</el-button>
            </div>
          </div>
          <el-table
            :data="tableData"
            v-loading="loading"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="名称"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="图片"
              align="center"
              width="180">
              <template slot-scope="scope">
                <img src="http://img.rooyeer.com/ede872fee591489ba9ca63f79cadfcc3" alt="">
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              align="center"
              label="地址">
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text">编辑</el-button>
                <el-button type="text" class="c-red">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-dialog
        title="添加广告"
        :visible.sync="dialogVisible"
        width="50%">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="平台类型">
            <el-radio-group v-model="form.plat" size="small">
              <el-radio-button label="pc">PC端</el-radio-button>
              <el-radio-button label="web">手机端</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="广告名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="选择广告位">
            <el-select v-model="form.region" placeholder="请选择广告位">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="链接地址">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="广告图片">
            <el-upload
              class="avatar-uploader"
              action="https://wxin.natapp4.cc/admin/material/upload/"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" type="text" class="mr-10">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'advertSet',
  data() {
    return {
      activeName: 'first',
      platStatus: '1',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      loading:false,
      form:{
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        plat: 'pc'
      },
      dialogVisible:false,
      imageUrl: '',
      headers: {'Authorization':'9d0c03e4-176c-4215-b87e-75f1d3f8f11e'}
    }
  },
  mounted() {

  },
  methods: {
    platTab(tab) {
      this.loading = true
      setTimeout(() => {
        this.platStatus = tab
        this.loading = false
      },1000)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
