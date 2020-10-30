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
              <el-button type="primary" :icon="scope.row.icon" circle style="font-size: 24px;"></el-button>
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
          <div>
          <el-button type="text" @click="dialogVisible = true">配置</el-button>
          <el-button type="text" @click="modelProp = true">模板</el-button>
          <el-button type="text">开启</el-button>
          </div>
          <div>
            <el-button type="text">商家通知</el-button>
            <el-button type="text">通知记录</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="配置"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            active-text="开"
            inactive-text="关">
          </el-switch>
        </el-form-item>
        <el-form-item label="APP_KEY">
          <el-input v-model="form.APP_KEY"></el-input>
        </el-form-item>
        <el-form-item label="SECRET_KEY">
          <el-input v-model="form.SECRET_KEY"></el-input>
        </el-form-item>
        <el-form-item label="短信内容签名">
          <el-input v-model="form.MSG_KEY"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="text" class="mr-10">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="模板编辑"
      :visible.sync="modelProp"
      width="50%">
      <el-form ref="form" :model="model" label-width="120px">
        <el-form-item label="模板ID">
          <el-input v-model="model.modelID"></el-input>
        </el-form-item>
        <el-form-item label="短信签名">
          <el-input v-model="model.KEY"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modelProp = false" type="text" class="mr-10">取 消</el-button>
        <el-button type="primary" @click="modelProp = false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'msgSet',
  data() {
    return {
      tableData: [
        {
          icon: 'el-icon-message',
          type: '短信通知',
          status: 0,
          tips: '使用该功能需开通阿里云短信业务'
        }
      ],
      dialogVisible: false,
      form: {
        status:0,
        APP_KEY:'',
        SECRET_KEY:'',
        MSG_KEY:''
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
