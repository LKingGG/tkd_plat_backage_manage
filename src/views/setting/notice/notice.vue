<template>
  <div>
    <div class="mt-10">
      <el-button type="primary" @click="add">添加首页公告</el-button>
    </div>
    <el-table :data="tableList" style="width: 100%;margin-top:20px;" border>
      <el-table-column align="center" label="公告标题">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.updatedTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序" width="200">
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
        <el-form-item label="公告标题">
          <el-input v-model="form.name" placeholder="请输入公告标题" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.num" controls-position="right" :precision="0" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input
            type="textarea"
            :rows="6"
            placeholder=""
            v-model="textarea">
          </el-input>
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
    name: 'notice',
    data() {
      return {
        tableList: [],
        dialogType: 'add',
        dialogVisible: false,
        form:{
          name:'',
          pwd:'',
          role:'',
          num:''
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
</style>
