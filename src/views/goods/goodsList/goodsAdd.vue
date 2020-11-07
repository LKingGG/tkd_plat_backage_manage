<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="基础设置">
        <el-divider content-position="left">商品类型</el-divider>
        <el-radio class="ml-20" v-model="form.goodsType" label="1" border>实物商品</el-radio>
        <el-radio v-model="form.goodsType" label="2" border>虚拟商品</el-radio>
        <el-divider content-position="left">商品类型</el-divider>
        <el-form ref="form" :model="form" label-width="100px" v-if="form.goodsType == 1">
          <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              v-model="form.name"
              :options="options"
              :props="{ checkStrictly: true }"
              @change="handleChange"
              size="mini"></el-cascader>
          </el-form-item>
          <el-form-item label="商品促销语">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品单位">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品品牌">
            <el-select v-model="form.region" placeholder="请选择商品品牌">
              <el-option label="品牌一" value="shanghai"></el-option>
              <el-option label="品牌二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供货商">
            <el-select v-model="form.region" placeholder="请选择商品品牌">
              <el-option label="品牌一" value="shanghai"></el-option>
              <el-option label="品牌二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="基础销量">
            <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 件
          </el-form-item>
          <el-form-item label="基础点击量">
            <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 件
          </el-form-item>
          <el-form-item label="基础分享数">
            <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 件
          </el-form-item>
          <el-form-item label="商家编号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="生产日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" class="w-150"></el-date-picker>
          </el-form-item>
          <el-form-item label="保质期天数">
            <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 天
          </el-form-item>
          <el-form-item label="总库存">
            <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 件
          </el-form-item>
          <el-form-item label="库存预警">
            <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 件
            <div class="c-aaa" style="font-size: 12px;">设置最低库存预警值。当库存低于预警值时商家中心商品列表页库存列红字提醒。
    0为不预警。</div>
          </el-form-item>
          <el-form-item label="库存显示">
            <el-radio-group v-model="form.resource">
              <el-radio label="是" value="0"></el-radio>
              <el-radio label="否" value="1"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否上架">
            <el-radio-group v-model="form.resource">
              <el-radio label="立刻上架" value="0"></el-radio>
              <el-radio label="放入仓库" value="1"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品所在地">
            <el-radio-group v-model="form.resource">
              <el-radio label="立刻上架" value="0"></el-radio>
              <el-radio label="放入仓库" value="1"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <!--              购买信息                -->
        <el-divider content-position="left">购买信息</el-divider>
        <el-form>
          <el-form-item label="市场价格">
            <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 元
          </el-form-item>
          <el-form-item label="销售价格">
            <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 元
          </el-form-item>
          <el-form-item label="成本价格">
            <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 元
          </el-form-item>
          <el-form-item label="运费模式">
            <el-radio-group v-model="form.resource">
              <el-radio label="免邮" value="0"></el-radio>
              <el-radio label="买家承担运费" value="1"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="运费模板">
            <el-select v-model="form.region" placeholder="请选择运费模板">
              <el-option label="模板一" value="shanghai"></el-option>
              <el-option label="模板二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="每人限购">
            <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 件
          </el-form-item>
          <el-form-item label="最少购买数">
            <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 件
          </el-form-item>
        </el-form>
        <!--              预售设置                -->
        <el-divider content-position="left">预售设置</el-divider>
        <el-form>
          <el-form-item label="是否支持预售">
            <el-radio-group v-model="form.resource">
              <el-radio label="是" value="0"></el-radio>
              <el-radio label="否" value="1"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <!--              积分设置                -->
        <el-divider content-position="left">积分设置</el-divider>
        <el-form>
          <el-form-item label="">
            <el-radio-group v-model="form.resource">
              <el-radio label="是" value="0"></el-radio>
              <el-radio label="否" value="1"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="积分兑换设置">
            <el-radio-group v-model="form.resource">
              <el-radio label="非积分兑换" value="0"></el-radio>
              <el-radio label="只支持积分兑换" value="1"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <!--              折扣设置                -->
        <el-divider content-position="left">折扣设置</el-divider>
        <el-form>
          <el-form-item label="普通会员">
            <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> %
          </el-form-item>
          <el-form-item label="价格保留方式">
            <el-radio-group v-model="form.resource">
              <el-radio label="抹去角和分" value="0"></el-radio>
              <el-radio label="抹去分" value="1"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 商品规格 start -->
      <el-tab-pane label="商品规格">
        <div>
          <el-button type="primary" size="mini" @click="dialogVisible = true">编辑规格</el-button>
          <el-button size="mini">清空规格</el-button>
        </div>
        <el-card shadow="hover" class="mt-10">
          <div style="color: orange;font-size: 12px;">
            <el-divider content-position="left">操作提示</el-divider>
            <p>1、规格尽量添加完再操作数据，修改规格可能出现价格、库存重置</p>
          </div>
          <div>
            <el-divider content-position="left">已选规格</el-divider>
            <el-table
              :data="specsData"
              border
              style="width: 100%"
              :show-header="false">
              <el-table-column
                prop="name"
                label="规格名"
                width="180">
              </el-table-column>
              <el-table-column
                label="规格内容">
                <template slot-scope="scope">
                  <el-button v-for="(item,index) in scope.row.list" type="primary" size="mini">{{item}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <div class="mt-10">
          批量设置：
          <el-button type="text" size="mini">销量价格</el-button>
          <el-button type="text" size="mini">市场价格</el-button>
          <el-button type="text" size="mini">成本价格</el-button>
          <el-button type="text" size="mini">库存</el-button>
          <el-input type="number" size="mini" placeholder="销量价格" class="w-150 mr-10"></el-input>
          <el-button type="primary" size="mini" >确定</el-button>
          <el-button type="primary" size="mini">取消</el-button>
        </div>
        <el-table
          :data="specsData"
          border
          style="width: 100%"
          class="mt-10"
          highlight-current-row>
          <el-table-column
            label="商品规格">
            <template slot-scope="scope">
              <el-button v-for="(item,index) in scope.row.list" type="primary" size="mini">{{item}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="销售价格"
            width="180">
            <template><el-input size="mini"></el-input></template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="市场价格"
            width="180">
            <template><el-input size="mini"></el-input></template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="成本价格"
            width="180">
            <template><el-input size="mini"></el-input></template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="库存"
            width="180">
            <template><el-input size="mini"></el-input></template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 商品规格 end -->
      <!-- 商品属性 start -->
      <el-tab-pane label="商品属性">
        <el-table
          :data="propertyData"
          border
          style="width: 500px"
          highlight-current-row>
          <el-table-column
            align="center"
            label="属性名称">
            <template slot-scope="scope"><el-input placeholder="请输入属性名称" size="mini" v-model="scope.row.key"></el-input></template>
          </el-table-column>
          <el-table-column
            label="属性内容"
            align="center">
            <template slot-scope="scope"><el-input placeholder="请输入属性内容" size="mini" v-model="scope.row.value"></el-input></template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="50">
            <template slot-scope="scope">
              <el-button type="text" class="c-red" size="mini" @click="deleteProperty(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button style="width: 500px;" icon="el-icon-plus" type="primary" size="mini" @click="addPropertyBtn">添加</el-button>
      </el-tab-pane>
      <!-- 商品属性 end -->
      <!-- 媒体设置 start -->
      <el-tab-pane label="媒体设置">
        <el-form>
          <el-divider content-position="left">商品图片</el-divider>
          <el-form-item label="商品类型">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-divider content-position="left">展示视频</el-divider>
          <el-form-item label="视频上传">
            <el-upload class="avatar-uploader"
               action="上传地址"
               v-bind:data="{FoldPath:'上传目录',SecretKey:'安全验证'}"
               v-bind:on-progress="uploadVideoProcess"
               v-bind:on-success="handleVideoSuccess"
               v-bind:before-upload="beforeUploadVideo"
               v-bind:show-file-list="false">
              <video v-if="videoForm.showVideoPath !='' && !videoFlag"
                 v-bind:src="videoForm.showVideoPath"
                 class="avatar video-avatar"
                 controls="controls">
                  您的浏览器不支持视频播放
              </video>
              <i v-else-if="videoForm.showVideoPath =='' && !videoFlag"
               class="el-icon-plus avatar-uploader-icon"></i>
              <el-progress v-if="videoFlag == true"
               type="circle"
               v-bind:percentage="videoUploadPercent"
               style="margin-top:7px;"></el-progress>
            </el-upload>
          </el-form-item>
          <el-divider content-position="left">商品详情</el-divider>
          <el-form-item label="商品详情">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
              multiple>
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 媒体设置 end -->

      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
    </el-tabs>
    <el-dialog
      title="选择规格"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <div>
        <el-select v-model="form.region" placeholder="请选择商品规格">
          <el-option label="品牌一" value="shanghai"></el-option>
          <el-option label="品牌二" value="beijing"></el-option>
        </el-select>
      </div>
      <el-row>
        <el-col :span="3"></el-col>
        <el-col :span="9"></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      form: {
        goodsType: '1',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      propertyData:[{
        key:'',
        value:''
      },{
        key:'',
        value:''
      }],
      specsData:[{
        name:'颜色',
        list:['红','白']
      },{
        name:'这是字数特别多的时候',
        list:['恩恩特别的多的','不拉不拉不拉不拉不拉日记']
      }],
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
          showVideoPath: ''
      },
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      dialogVisible: false,
    }
  },
  mounted() {

  },
  methods: {
    addPropertyBtn(){
      this.propertyData.push([{'key':'','value':''}])
    },
    deleteProperty(index,row){
      console.log(index, row);
      this.propertyData.splice(index,1)
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
    },
    /* 上传视频 start */
    beforeUploadVideo(file) {
        var fileSize = file.size / 1024 / 1024 < 50;
        if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
            layer.msg("请上传正确的视频格式");
            return false;
        }
        if (!fileSize) {
            layer.msg("视频大小不能超过50MB");
            return false;
        }
        this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
        this.videoFlag = true;
        this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
        this.isShowUploadVideo = true;
        this.videoFlag = false;
        this.videoUploadPercent = 0;

        //前台上传地址
        //if (file.status == 'success' ) {
        //    this.videoForm.showVideoPath = file.url;
        //} else {
        //     layer.msg("上传失败，请重新上传");
        //}

        //后台上传地址
        if (res.Code == 0) {
            this.videoForm.showVideoPath = res.Data;
        } else {
            layer.msg(res.Message);
        }
    }
    /* 上传视频 end */
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
