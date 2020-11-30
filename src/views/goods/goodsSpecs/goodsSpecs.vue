<template>
  <div>
    <div class="mt-10">
      <el-button type="primary" @click="add">新增规格</el-button>
    </div>
    <el-table :data="tableList" style="width: 100%;margin-top:20px;" border>
      <el-table-column align="center" label="规格名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.specName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="规格属性">
        <template slot-scope="scope">
          {{ scope.row.specAttrs }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最近更新时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.updatedTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.createdTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="启用状态" width="70">
        <template slot-scope="scope">
          <i v-if="scope.row.status == 1" class="el-icon-success c-blue" style="font-size: 22px;"></i>
          <i v-else class="el-icon-error c-999" style="font-size: 22px;"></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" width="50%" :title="dialogType==='edit'?'Edit':'New'">
      <el-form :model="form" label-width="100px" label-position="left">
        <el-form-item label="规格名称">
          <el-input v-model="form.specName" placeholder="请输入规格名称" />
        </el-form-item>
        <el-form-item label="规格属性">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加规格</el-button>
        </el-form-item>
        <el-form-item label="是否启用" size="mini">
          <el-radio-group v-model="form.status">
            <el-radio-button label="0">否</el-radio-button>
            <el-radio-button label="1">是</el-radio-button>
          </el-radio-group>
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
  export default {
    name: '',
    data() {
      return {
        tableList: [],
        params: {
          page: 1,
          limit: 5,
          specName:''
        },
        dialogType: 'add',
        dialogVisible: false,
        inputVisible: false,
        inputValue: '',
        dynamicTags: [],
        form:{
          specName: '', //规格名称
          status: '0', //规格状态
          id: '', //规格id 不填时为新建，填写时为修改
          specAttrs: '', //规格属性值列表
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
      this.loadData()
    },
    methods: {
      add() {
        this.dialogType = 'add'
        this.dialogVisible = true
      },
      handleEdit() {
        this.dialogType = 'edit'
        this.dialogVisible = true
      },
      loadData(){
        this.$api.specList(this.params).then(res => {
          this.tableList = res.data.data
        })
      },
      dialogBtn(){
        if(!this.form.specName){
          this.$message.warning('请输入规格名称')
        }
        if(this.dynamicTags.length == 0){
          this.$message.warning('至少添加一个规格')
        }
        this.form.specAttrs = this.dynamicTags.join(',')
        this.$api.specSave(this.form).then(res => {
          this.$message.success('添加成功')
          this.loadData()
          this.dialogVisible = false
          this.form = {
            specName: '', //规格名称
            status: '0', //规格状态
            id: '', //规格id 不填时为新建，填写时为修改
            specAttrs: [], //规格属性值列表
          }
          this.dynamicTags = []
        })
      },
      /* 添加标签 */
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>

<style scoped="">
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
