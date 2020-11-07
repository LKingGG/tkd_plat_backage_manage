<template>
  <div>
    <div class="mt-10">
      <el-button type="primary" @click="add">新增规格</el-button>
    </div>
    <el-table :data="tableList" style="width: 100%;margin-top:20px;" border>
      <el-table-column align="center" label="规格名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="图片" width="200">
        <template slot-scope="scope">
          {{ scope.row.updatedTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="品牌首字母" width="200">
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
      <el-form :model="form" label-width="100px" label-position="left">
        <el-form-item label="规格名称">
          <el-input v-model="form.name" placeholder="请输入规格名称" />
        </el-form-item>
        <el-form-item label="品牌首字母">
          <el-input placeholder="请输入密码" v-model="form.pwd"></el-input>
        </el-form-item>
        <el-form-item label="规格值">
          <el-input
            type="textarea"
            :rows="2"
            placeholder=""
            v-model="textarea">
          </el-input>
          <div class="c-aaa" style="font-size: 12px;">一行为一个规格项，多个规格项用换行输入</div>
        </el-form-item>
        <el-form-item label="是否启用" size="mini">
          <el-radio-group v-model="radio1">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否筛选" size="mini">
          <el-radio-group v-model="radio1">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="text" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">{{ dialogType==='edit'?'修改':'添加' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        tableList: [],
        dialogType: 'add',
        dialogVisible: false,
        form:{
          name:'',
          pwd:'',
          role:''
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
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
