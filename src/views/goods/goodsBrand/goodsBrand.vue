<template>
  <div>
    <div class="mt-10">
      <el-button type="primary" @click="add">新增品牌</el-button>
    </div>
    <el-table :data="tableList" style="width: 100%;margin-top:20px;" border>
      <el-table-column align="center" label="品牌名称">
        <template slot-scope="scope">
          {{ scope.row.brandName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="品牌图片" width="110">
        <template slot-scope="scope">
          <img :src="scope.row.brandImage" width="80" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属分类" width="200">
        <template slot-scope="scope">
          {{ scope.row.categoryPath }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最近更新时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.updatedTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="160">
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
        <el-form-item label="品牌名称">
          <el-input v-model="form.brandName" placeholder="brandName" />
        </el-form-item>
        <el-form-item label="所属分类">
          <el-cascader v-model="form.categoryId" :props="props" placeholder="请选择"
            :clearable="true" :show-all-levels="false"></el-cascader>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="https://wxin.natapp4.cc/material/mt/upload/"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            v-loading="uploading">
            <img v-if="form.brandImage" :src="form.brandImage" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="text" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="dialogBtn">{{ dialogType==='edit'?'修改':'添加' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getToken } from '@/utils/auth'
  export default {
    name: '',
    data() {
      return {
        page: 1, // 总页数
        total: 0, // 总条数
        params:{
          page: 1, //页码
          limit: 20, //每页显示数量
          brand: '', //品牌名称 选填
          categoryId: '', //所属类目id 选填
        },
        tableList: [],
        dialogType: 'add',
        dialogVisible: false,
        uploading:false,
        form:{
          brandName:'', // 品牌名称
          brandImage:'', // 品牌图片
          imageKey:'', // 图片key
          categoryId:'', // 所属分类
          id:'', // 品牌id 不填时为新建，填写时为修改
        },
        categoryList: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        headers: {'Authorization':getToken()},
        props: {
          expandTrigger: 'hover',
          emitPath: false,
          lazy:true,
          lazyLoad:this.lazyLoad,
          checkStrictly: true
        },
      }
    },
    mounted() {
      this.loadData()
      this.getCategoryList()
    },
    methods: {
      loadData() {
        this.tableList = []
        this.$api.brandList(this.params).then(res => {
          this.tableList = res.data.data
          this.total = res.data.total
          this.page = res.data.page
        })
      },
      getCategoryList(){
        this.$api.categoryListAll().then(res => {

        })
      },
      lazyLoad(node,resolve){ // 获取子级分类
        this.getData(node,resolve)
      },
      getData(node,resolve){ //获取子级分类方法
        console.log('*************')
        console.log(node,resolve)
        const level = node.level
        var obj = {}
        if (level === 0) {
          obj = {}
        }
        if (level > 0) {
          obj.parentId = node.value
        }
        this.$api.categoryListAll(obj).then(res => {
          var result
          if (level === 0) {
            result = res.data
            result.forEach(item => {
              item.value = item.id;
              item.label = item.categoryName
            })
          }
          if (level > 0 && level < 3) {
            result = res.data
            result.forEach(item => {
              item.value = item.id;
              item.label = item.categoryName
              //这句代码表示当点击最后一级的时候 label后面不会转圈圈 并把相关值赋值到选择器上
              item.leaf = level >= 2
            })
          }
          resolve(result)
        })
      },
      dialogBtn(){
        if(!this.form.brandName){
          this.$message.warning('请输入品牌名称')
          return
        }
        if(!this.form.imageKey){
          this.$message.warning('请上传图片')
        }
        if(this.dialogType == 'add'){
          this.$api.brandSave(this.form).then(res =>{
            this.$message.success('添加成功')
            this.loadData()
            this.dialogVisible = false
          })
        }
      },
      add() {
        this.dialogType = 'add'
        this.dialogVisible = true
      },
      handleEdit() {
        this.dialogType = 'edit'
        this.dialogVisible = true
      },
      handleAvatarSuccess(res, file) { // 上传成功回调
        console.log(res,file)
        /* this.imageUrl = URL.createObjectURL(file.raw) */
        this.form.brandImage = file.response.data.download
        this.form.imageKey = file.response.data.key
        setTimeout(() => {
          this.uploading = false
        },500)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt5M = file.size / 1024 / 1024 < 5;

        /* if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        } */
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        this.uploading = true
        return isJPG && isLt5M;
      }
    }
  }
</script>

<style scoped="">
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
