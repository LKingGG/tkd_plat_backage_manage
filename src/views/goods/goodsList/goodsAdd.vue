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
            <el-input v-model="form.goodsName" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品标题">
            <el-input v-model="form.goodsTitle" placeholder="列表/详情显示的商品标题"></el-input>
          </el-form-item>
          <el-form-item label="商品编号">
            <el-input v-model="form.goodsCode" placeholder="商品编号"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader v-model="form.categoryId" @change="categoryChange" :props="props" placeholder="请选择"
              :clearable="true" :show-all-levels="false"></el-cascader>
          </el-form-item>
          <el-form-item label="商品品牌" v-if="form.brandId">
            <el-select v-model="form.brandId" placeholder="请选择商品品牌">
              <el-option v-for="(item,index) in brandList" :label="item.brandName" :value="item.id">
                <span style="float: left">{{ item.brandName }}</span>
                <img :src="item.brandImage" style="float: right; margin-top: 5px;" height="24" alt="">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品促销语">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品单位">
            <el-input-number v-model="form.weight" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 克
            <el-input-number v-model="form.volume" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> cm³
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
            <el-radio-group v-model="form.goodsStatus">
              <el-radio label="待上架" value="0"></el-radio>
              <el-radio label="销售中" value="1"></el-radio>
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
          <el-form-item label="商品原价">
            <el-input-number v-model="form.goodsPrice" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 元
          </el-form-item>
          <el-form-item label="销售价格">
            <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 元
          </el-form-item>
          <el-form-item label="成本价格">
            <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 元
          </el-form-item>
          <el-form-item label="运费模式">
            <el-radio-group v-model="form.freeExpress">
              <el-radio label="免邮" value="1"></el-radio>
              <el-radio label="买家承担运费" value="0"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="快递公司">
            <el-select v-model="form.region" placeholder="请选择快递公司">
              <el-option v-for="(item,index) in companyList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="每人限购">
            <el-input-number v-model="form.maxAmount" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 件
          </el-form-item>
          <el-form-item label="最少购买数">
            <el-input-number v-model="form.minAmount" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number> 件
          </el-form-item>
        </el-form>
        <!--              积分设置                -->
        <el-divider content-position="left">金币商品设置</el-divider>
        <el-form>
          <el-form-item label="是否为金币商品">
            <el-radio-group v-model="form.resource">
              <el-radio label="是" value="1"></el-radio>
              <el-radio label="否" value="0"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="金币返还费率">
            <el-input-number v-model="form.guideRate" controls-position="right" :precision="2" :min="0" :max="100" size="mini"></el-input-number> %
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 商品规格 start -->
      <el-tab-pane label="商品规格">
        <el-card shadow="hover" class="mt-10">
          <div style="color: orange;font-size: 12px;">
            <el-divider content-position="left">操作提示</el-divider>
            <p>1、规格尽量添加完再操作数据，修改规格可能出现价格、库存重置</p>
          </div>
          <div style="color: orange;font-size: 12px;">
            <el-divider content-position="left">添加规格</el-divider>
            <div>
              <el-select v-model="form.region" placeholder="请选择商品规格" size="mini">
                <el-option v-for="(item,index) in specList" :label="item.specName" :value="item.id"></el-option>
              </el-select>
              <el-button type="primary" size="mini" @click="dialogVisible = true">快速添加规格</el-button>
              <el-button size="mini">清空规格</el-button>
            </div>
          </div>
          <div>
            <el-divider content-position="left">已选规格</el-divider>
            <el-table
              :data="specsData"
              border
              style="width: 100%"
              :show-header="false">
              <el-table-column
                label="规格名"
                width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="规格内容">
                <template slot-scope="scope">
                  <el-tag
                    :key="tag"
                    v-for="tag in scope.row.list"
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
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="180">
                <template slot-scope="scope">
                  <el-button @click="">删除行</el-button>
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
          :data="form.attributes"
          border
          style="width: 600px"
          highlight-current-row>
          <el-table-column
            align="center"
            label="属性名称"
            width="200">
            <template slot-scope="scope"><el-input placeholder="请输入属性名称(例:品牌)" size="mini" v-model="scope.row.title"></el-input></template>
          </el-table-column>
          <el-table-column
            label="属性内容"
            align="center">
            <template slot-scope="scope"><el-input placeholder="请输入属性内容(例如:Nike/耐克)" size="mini" v-model="scope.row.value"></el-input></template>
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
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
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
        desc: '',
        id:'', // 商品id 不填时为新建，填写时为修改
        goodsName: '', //商品名字
        goodsTitle: '', //列表/详情显示的商品标题
        goodsPrice: '', //列表/详情显示的商品原价
        goodsDetail: '', //商品详情中显示的html文本
        categoryId: '', //商品所属分类id
        mainImage: '', //商品主图 主要用于商品列表中
        goodsVideo: '', //商品详情中商品轮播图中可以显示视频，如果存在则商品主图后挪一个位置
        images: '', //商品详情中商品轮播图 数组的json格式
        label: '', //商品标签 在商品列表/详情中显示 数组的json格式
        brandId: '', //商品所属品牌id
        goodsCode: '', //商品编号
        goodsStatus: '0', //商品状态 0 待上架 1销售中
        parentId: '', //商品所属店铺 平台创建商品时必填，商户/自营 创建商品时不填写
        maxAmount: '', //最高限购数量
        minAmount: '', //最低起购数量
        freeExpress: '0', //是否包邮 1是 0 否
        weight: '', //商品重量 单位 克
        volume: '', //商品体积 单位 立方厘米
        expressCompany: '', //快递公司名称
        companyCode: '', //快递公司对应的编号
        way: '', //快递计算方式 0 计件 1 计重 2 计体积
        unitPrice: '', //快递单位价格
        attributes: [{title:'',value:''}], //商品属性
        specs: '', //商品规格
        imageKeys: '', //商品图片key
        guideGoods: '0', //是否金币商品 0否 1是
        guideRate: '', //金币商品返还费率
        goodsSort: '', //商品排序序号
        saleAmount: '', //商品销售数量
        additionalServices: '', //加购服务 需要转成数组的json字符串
        goodsSku: '', //商品sku 需要转成数组的json字符串
      },
      companyList:[{
        value: 'SF',
        label: '顺丰速运'
      },{
        value: 'HTKY',
        label: '百世快递',
      },{
        value: 'ZTO',
        label: '中通快递'
      },{
        value: 'STO',
        label: '申通快递'
      },{
        value: 'YTO',
        label: '圆通速递'
      },{
        value: 'YD',
        label: '韵达速递'
      },{
        value: 'YZPY',
        label: '邮政快递包裹'
      },{
        value: 'EMS',
        label: 'EMS'
      },{
        value: 'HHTT',
        label: '天天快递'
      },{
        value: 'JD',
        label: '京东快递'
      },{
        value: 'UC',
        label: '优速快递'
      },{
        value: 'DBL',
        label: '德邦快递'
      },{
        value: 'ZJS',
        label: '宅急送'
      }],
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
      props: { // 分类列表
        expandTrigger: 'hover',
        emitPath: false,
        lazy:true,
        lazyLoad:this.lazyLoad,
        checkStrictly: true
      },
      brandList:[],
      specList:[]
    }
  },
  mounted() {
    let sendData = {
      page: 1,
      limit: 100,
    }
    this.$api.specList(this.params).then(res => {
      this.specList = res.data.data
    })
  },
  methods: {
    addPropertyBtn(){
      this.form.attributes.push([{'title':'','value':''}])
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
    },
    /* 上传视频 end */
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
    categoryChange(val){
      this.form.brandId = ''
      let sendData = {
        'categoryId' : val
      }
      this.$api.brandGet(sendData).then(res => {
        this.brandList = res.data
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
