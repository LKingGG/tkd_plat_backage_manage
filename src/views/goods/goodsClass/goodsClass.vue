<template>
  <div>
    <div class="mt-10">
      <div><el-button size="small" type="primary" @click="dialogVisible = true">添加商品分类</el-button></div>
      <div class="c-333 mt-10" style="font-size: 14px;"><span class="stepHover" @click="backRoot">顶级分类</span>
        <template v-for="(item,index) in step">
          <i class="el-icon-arrow-right"></i> <span class="stepHover" @click="jumpTo(index)">{{item.categoryName}}</span>
        </template>
      </div>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%"
        class="mt-10"
        row-key="id"
        border
        lazy
        v-loading="loading">
        <el-table-column
          prop="categoryName"
          label="分类名称">
          <template slot-scope="scope">
            <el-button type="text" @click="look(scope.row)">{{scope.row.categoryName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="图标"
          width="120">
          <template slot-scope="scope">
            <img v-if="scope.row.image" width="100" :src="scope.row.image" alt="">
            <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          width="60">
        </el-table-column>
        <el-table-column
          width="220"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="look(scope.row)" v-if="step.length < 2">查看子类目</el-button>
            <el-button type="text" @click="edit(scope.row)">编辑(未处理)</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div>{{tableData}}</div>
      <el-dialog
        title="添加商品分类"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <el-form :model="form" label-width="100px" label-position="left">
          <el-form-item label="目标目录">
            <template v-if="this.step.length == 0">
              <el-input value="顶级类目" disabled></el-input>
            </template>
            <template v-else>
              <el-input v-model="this.step[this.step.length-1].categoryName" disabled></el-input>
            </template>
          </el-form-item>
          <el-form-item label="分类名称">
            <el-input v-model="form.categoryName" placeholder="分类名称" />
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="form.sorts" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="图标" v-if="this.step.length != 0">
            <el-upload
              class="avatar-uploader"
              action="https://wxin.natapp4.cc/material/mt/upload/"
              :headers="headers"
              v-loading="uploading"
              element-loading-text="拼命上传中"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.image" :src="form.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setBtn">创 建</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import { getToken } from '@/utils/auth'
  export default {
    name: '',
    data() {
      return {
        pages: 1,
        total: 0,
        params: {
          page: 1,
          limit: 5,
          parentId:''
        },
        step:[],
        dialogVisible: false,
        form:{
          categoryName: '',
          parentId: '',
          image: '',
          sorts: 0,
          id: '',
          imageKey: ''
        },
        loading:false,
        uploading:false,
        tableData: [{
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
        }],
        headers: {'Authorization':getToken()}
      }
    },
    mounted(){
      this.loadData()
    },
    methods:{
      jumpTo(ind){
        this.params.page = 1
        this.params.parentId = this.step[ind].id
        if(ind == 0 && this.step.length > 1){
          this.step.splice(1,1)
        }
        this.loadData()
      },
      backRoot(){
        this.params.page = 1
        this.params.parentId = ''
        this.step = []
        this.loadData()
      },
      loadData(){
        this.loading = true
        this.tableData = []
        this.$api.categoryList(this.params).then(res => {
          this.tableData = res.data.data
          setTimeout(() => {
            this.loading = false
          }, 500)
        })
      },
      look(row){
        this.step.push(row)
        this.params.parentId = row.id
        this.loadData()
      },
      handleClose(){
        this.dialogVisible = false
      },
      setBtn(){
        if(this.step.length > 0){
          this.form.parentId = this.step[this.step.length - 1].id
        }else{
          this.form.parentId = ''
        }
        if(!this.form.categoryName){
          this.$message.warning('分类名称不能为空')
          return
        }
        this.$api.categorySave(this.form).then(res => {
          console.log(res)
          if(res.code == 0){
            this.$message.success('创建成功！')
            this.dialogVisible = false
          }
        })
      },
      handleAvatarSuccess(res, file) { // 上传成功回调
        console.log(res,file)
        /* this.imageUrl = URL.createObjectURL(file.raw) */
        this.form.image = file.response.data.download
        this.form.imageKey = file.response.data.key
        setTimeout(() => {
          this.uploading = false
        },500)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        /* if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        } */
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        this.uploading = true
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style scoped="">
  .stepHover:hover{
    cursor: pointer;
    color: #999;
  }
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
