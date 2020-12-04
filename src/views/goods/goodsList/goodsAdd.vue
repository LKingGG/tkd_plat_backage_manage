<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="基础设置">
        <el-divider content-position="left">商品类型</el-divider>
        <el-radio class="ml-20" v-model="form.goodsType" label="0" border>实物商品</el-radio>
        <el-radio v-model="form.goodsType" label="1" border>虚拟商品</el-radio>
        <el-divider content-position="left">基本信息</el-divider>
        <el-form ref="form" :model="form" label-width="100px" v-if="form.goodsType == 0">
          <el-form-item label="商品名称">
            <el-input v-model="form.goodsName" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品标题">
            <el-input v-model="form.goodsTitle" placeholder="列表/详情显示的商品标题"></el-input>
          </el-form-item>
          <el-form-item label="商品编号">
            <el-input v-model="form.goodsCode" placeholder="商品编号"></el-input>
          </el-form-item>
          <el-form-item label="商品标签">
            <el-tag
              :key="tag"
              v-for="tag in labelList"
              closable
              :disable-transitions="false"
              @close="labelClose(tag,labelList)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="labelVisible"
              v-model="labelValue"
              ref="labelInput"
              size="small"
              @keyup.enter.native="handleLabelConfirm(labelValue)"
              @blur="handleLabelConfirm(labelValue)"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showLabel">+ 添加标签</el-button>
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
            <el-input-number v-model="form.weight" controls-position="right" :min="1" size="mini"></el-input-number> 克
            <el-input-number v-model="form.volume" controls-position="right" :min="1" size="mini"></el-input-number> cm³
          </el-form-item>
          <el-form-item label="商家编号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品序号">
            <el-input-number v-model="form.goodsSort" controls-position="right" :min="1" size="mini" :precision="0"></el-input-number>
          </el-form-item>
          <el-form-item label="是否上架">
            <el-radio-group v-model="form.goodsStatus">
              <el-radio label="0">待上架</el-radio>
              <el-radio label="1">销售中</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="商品所在地">
            <el-radio-group v-model="form.resource">
              <el-radio label="立刻上架" value="0"></el-radio>
              <el-radio label="放入仓库" value="1"></el-radio>
            </el-radio-group>
          </el-form-item> -->
        </el-form>
        <!--              购买信息                -->
        <el-divider content-position="left">购买信息</el-divider>
        <el-form>
          <el-form-item label="商品原价">
            <el-input-number v-model="form.goodsPrice" controls-position="right" :min="1" :max="10" size="mini"></el-input-number> 元
          </el-form-item>
          <el-form-item label="销售价格">
            <el-input-number v-model="num" controls-position="right" :min="1" :max="10" size="mini"></el-input-number> 元
          </el-form-item>
          <el-form-item label="成本价格">
            <el-input-number v-model="num" controls-position="right" :min="1" :max="10" size="mini"></el-input-number> 元
          </el-form-item>
          <el-form-item label="运费模式">
            <el-radio-group v-model="form.freeExpress">
              <el-radio label="1">免邮</el-radio>
              <el-radio label="0">买家承担运费</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="快递公司">
            <el-select v-model="form.region" placeholder="请选择快递公司">
              <el-option v-for="(item,index) in companyList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="每人限购">
            <el-input-number v-model="form.maxAmount" controls-position="right" :min="1" :max="10" size="mini"></el-input-number> 件
          </el-form-item>
          <el-form-item label="最少购买数">
            <el-input-number v-model="form.minAmount" controls-position="right" :min="1" :max="10" size="mini"></el-input-number> 件
          </el-form-item>
        </el-form>
        <!--              积分设置                -->
        <el-divider content-position="left">金币商品设置</el-divider>
        <el-form>
          <el-form-item label="是否为金币商品">
            <el-radio-group v-model="form.guideGoods">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
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
              <el-select v-model="specSel" placeholder="请选择商品规格" size="mini">
                <el-option v-for="(item,index) in specList" :label="item.specName" :value="item.id"></el-option>
              </el-select>
              <el-button type="primary" size="mini" @click="fastAdd()">快速添加规格</el-button>
              <el-button size="mini" @click="creatRow">新建规格行</el-button>
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
                  <el-input v-model="scope.row.name" @blur="specsNameChange(scope.row.name)"></el-input>
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
                    @close="handleClose(tag,scope.row)">
                    {{tag}}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="scope.row.inputVisible"
                    v-model="scope.row.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(scope.row)"
                    @blur="handleInputConfirm(scope.row)"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ 添加规格</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="90">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="deleteRow(scope.$index, specsData)" icon="" size="mini" type="warning">删除行</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <!-- <div class="mt-10">
          <el-button type="primary" size="mini" icon="el-icon-date">生成规格sku</el-button>
        </div> -->
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
          :data="form.goodsSku"
          border
          style="width: 100%"
          class="mt-10"
          v-loading="skuLoading"
          highlight-current-row>
          <el-table-column
            label="商品规格">
            <template slot-scope="scope">
              <span v-for="(item,index) in scope.row.rulePath">{{index == 0?'':'-'}}{{item}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="销售价格"
            width="180">
            <template slot-scope="scope"><el-input size="mini" v-model="scope.row.salePrice"></el-input></template>
          </el-table-column>
          <el-table-column
            label="市场价格"
            width="180">
            <template slot-scope="scope"><el-input size="mini" v-model="scope.row.price"></el-input></template>
          </el-table-column>
          <el-table-column
            label="sku编号"
            width="180">
            <template slot-scope="scope"><el-input size="mini" v-model="scope.row.skuCode"></el-input></template>
          </el-table-column>
          <el-table-column
            label="图片"
            width="100">
            <template slot-scope="scope">
              <el-upload
                class="sku-uploader"
                action="https://wxin.natapp4.cc/material/mt/upload/"
                :headers="headers"
                :show-file-list="false"
                :on-success="(res, file)=>{return handleAvatarSuccess(res, file, scope.row)}"
                :before-upload="beforeAvatarUpload">
                <img v-if="scope.row.image" :src="scope.row.image" class="avatar">
                <i v-else class="el-icon-plus sku-uploader-icon"></i>
              </el-upload>
            </template>
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
        <el-button style="width: 600px;" icon="el-icon-plus" type="primary" size="mini" @click="addPropertyBtn">添加</el-button>
      </el-tab-pane>
      <!-- 商品属性 end -->
      <!-- 媒体设置 start -->
      <el-tab-pane label="媒体设置">
        <el-form>
          <el-divider content-position="left">展示视频</el-divider>
          <el-form-item label="视频上传">
            <el-upload class="avatar-uploader"
               action="https://wxin.natapp4.cc/material/mt/upload/"
              :headers="headers"
               v-bind:data="{FoldPath:'上传目录',SecretKey:'安全验证'}"
               v-bind:on-progress="uploadVideoProcess"
               v-bind:on-success="handleVideoSuccess"
               v-bind:before-upload="beforeUploadVideo"
               v-bind:show-file-list="false">
              <video v-if="videoForm.showVideoPath !='' && !videoFlag"
                 :src="videoForm.showVideoPath"
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
          <el-divider content-position="left">商品图片</el-divider>
          <el-form-item label="商品主图">
            <el-upload
              class="avatar-uploader"
              action="https://wxin.natapp4.cc/material/mt/upload/"
              :headers="headers"
              :show-file-list="false"
              :on-success="mainImageUpload"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.mainImage" :src="form.mainImage" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品次图">
            <el-upload
              class="upload-demo"
              action="https://wxin.natapp4.cc/material/mt/upload/"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :file-list="fileList"
              list-type="picture"
              multiple>
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-divider content-position="left">商品详情</el-divider>
          <tinymce v-model="form.goodsDetail" :height="500" />
        </el-form>
      </el-tab-pane>
      <!-- 媒体设置 end -->
      <!-- 加购服务 start -->
      <el-tab-pane label="加购设置">
        <el-table
          :data="form.additionalServices"
          border
          style="width: 600px"
          highlight-current-row>
          <el-table-column
            align="center"
            label="服务名称"
            width="400">
            <template slot-scope="scope"><el-input placeholder="请输入服务名称(例:1年碎屏保修服务)" size="mini" v-model="scope.row.serviceName"></el-input></template>
          </el-table-column>
          <el-table-column
            label="价格"
            align="center">
            <template slot-scope="scope">
              <el-input placeholder="请输入价格" type="number" size="mini" v-model="scope.row.price">
                <span
                  class="el-input__icon"
                  slot="suffix">
                  元
                </span>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="50">
            <template slot-scope="scope">
              <el-button type="text" class="c-red" size="mini" @click="deleteServices(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button style="width: 600px;" icon="el-icon-plus" type="primary" size="mini" @click="addServicesBtn">添加</el-button>
      </el-tab-pane>
      <!-- 加购服务 end -->
    </el-tabs>
    <div class="goodsFooter"><el-button type="primary" @click="submit">提 交</el-button></div>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import { getToken } from '@/utils/auth'
export default {
  components: { Tinymce },
  name: 'editor',
  data() {
    return {
      form: {
        goodsType: '0',
        id:'', // 商品id 不填时为新建，填写时为修改
        goodsName: '', //商品名字
        goodsTitle: '', //列表/详情显示的商品标题
        goodsPrice: '', //列表/详情显示的商品原价
        goodsDetail: '', //商品详情中显示的html文本
        categoryId: '', //商品所属分类id
        mainImage: '', //商品主图 主要用于商品列表中
        mainKey: '', // 商品主图key，提交时需要添加到imageKeys里
        goodsVideo: '', //商品详情中商品轮播图中可以显示视频，如果存在则商品主图后挪一个位置
        images: '', //商品详情中商品轮播图 数组的json格式
        label: '', //商品标签 在商品列表/详情中显示 数组的json格式
        brandId: '', //商品所属品牌id
        goodsCode: '', //商品编号
        goodsStatus: '0', //商品状态 0 待上架 1销售中
        parentId: '', //商品所属店铺 平台创建商品时必填，商户/自营 创建商品时不填写
        maxAmount: '', //最高限购数量
        minAmount: '', //最低起购数量
        freeExpress: '1', //是否包邮 1是 0 否
        weight: '', //商品重量 单位 克
        volume: '', //商品体积 单位 立方厘米
        expressCompany: '', //快递公司名称
        companyCode: '', //快递公司对应的编号
        unitPrice: '', //快递单位价格
        attributes: [], //商品属性
        specs: '', //商品规格
        imageKeys: '', //商品图片key
        guideGoods: '0', //是否金币商品 0否 1是
        guideRate: '', //金币商品返还费率
        goodsSort: '0', //商品排序序号
        saleAmount: '', //商品销售数量
        additionalServices: [], //加购服务 需要转成数组的json字符串
        goodsSku: [], //商品sku 需要转成数组的json字符串
      },
      upload: {
        goodsType: '0',
        id:'', // 商品id 不填时为新建，填写时为修改
        goodsName: '', //商品名字
        goodsTitle: '', //列表/详情显示的商品标题
        goodsPrice: '', //列表/详情显示的商品原价
        goodsDetail: '', //商品详情中显示的html文本
        categoryId: '', //商品所属分类id
        mainImage: '', //商品主图 主要用于商品列表中
        mainKey: '', // 商品主图key，提交时需要添加到imageKeys里
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
        unitPrice: '', //快递单位价格
        attributes: [], //商品属性
        specs: '', //商品规格
        imageKeys: '', //商品图片key
        guideGoods: '0', //是否金币商品 0否 1是
        guideRate: '', //金币商品返还费率
        goodsSort: 0, //商品排序序号
        saleAmount: '', //商品销售数量
        additionalServices: [], //加购服务 需要转成数组的json字符串
        goodsSku: [], //商品sku 需要转成数组的json字符串
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
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
          showVideoPath: '',
          showVideoKey: ''
      },
      fileList: [], // 商品详情多图暂存地儿
      dialogVisible: false,
      props: { // 分类列表
        expandTrigger: 'hover',
        emitPath: false,
        lazy:true,
        lazyLoad:this.lazyLoad,
        checkStrictly: true
      },
      brandList:[],
      specList:[],
      specSel:'',
      specsData:[{ // 商品规格暂存地儿
        name:'颜色',
        list:['红','白'],
        inputVisible: false,
        inputValue: '',
      },{
        name:'这是字数特别多的时候',
        list:['恩恩特别的多的','不拉不拉不拉不拉不拉日记'],
        inputVisible: false,
        inputValue: '',
      }],
      labelList: [], //商品标签暂存处
      labelVisible: false, //商品标签暂存处
      labelValue: '', //商品标签暂存处
      skuLoading:false, // 正在加载商品sku
      headers: {'Authorization':getToken()},
      editorContent: ''
    }
  },
  mounted() {
    let sendData = {
      page: 1,
      limit: 100,
    }
    this.$api.specList(this.params).then(res => {
      this.specList = res.data.list
    })
  },
  methods: {
    getContent() {
      alert(this.editorContent)
    },
    addPropertyBtn(){
      this.form.attributes.push({'title':'','value':''})
    },
    deleteProperty(index,row){
      console.log(index, row);
      this.form.attributes.splice(index,1)
    },
    addServicesBtn(){
      this.form.additionalServices.push({'serviceName':'','price':''})
    },
    deleteServices(index,row){
      console.log(index, row);
      this.form.additionalServices.splice(index,1)
    },
    mainImageUpload(res, file) { // 商品主图上传
      console.log(res, file)
      /* row.image = URL.createObjectURL(file.raw); */
      this.form.mainImage = res.data.download
      this.form.mainKey = res.data.key
    },
    handleAvatarSuccess(res, file, row) {
      console.log(res, file)
      /* row.image = URL.createObjectURL(file.raw); */
      row.image = res.data.download
      row.key = res.data.key
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      /* if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      } */
      return isJPG && isLt2M;
    },
    /* 上传商品详情轮播多图 start */
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file, fileList) {
      console.log(file, fileList);
    },
    handleChange(file, fileList) {
      console.log(file,fileList)
      /* this.fileList = fileList.slice(-3); */
      this.fileList = fileList
    },
    /* imageUpload(res, file) { // 商品主图上传
      console.log(res, file)
      this.images.push(res.data.download)
    }, */
    /* 上传商品详情轮播多图 end */
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
        if (res.code == 0) {
            this.videoForm.showVideoPath = res.data.download;
            this.videoForm.showVideoKey = res.data.key;
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
    deleteRow(index, rows) { // 删除标签行
      rows.splice(index, 1);
    },
    /* 添加规格 */
    handleClose(tag,row) {
      row.list.splice(row.list.indexOf(tag), 1);
    },

    showInput(row) {
      row.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm(row) {
      let inputValue = row.inputValue;
      if (inputValue) {
        row.list.push(inputValue);
      }
      row.inputVisible = false;
      row.inputValue = '';
    },
    testspecs(){
      let bool = true
      for(var i in this.specsData) {
        if(this.specsData[i].list.length == 0 || !this.specsData[i].name){
          bool = false
          this.$message.warning('规格名或规格内容不能为空')
        }
      }
      return bool
    },
     /* 添加规格↑*end* */
    /* 添加标签 */
    labelClose(tag,list) {
      list.splice(list.indexOf(tag), 1);
    },
    showLabel() {
      this.labelVisible = true;
      this.$nextTick(_ => {
        this.$refs.labelInput.$refs.input.focus();
      });
    },
    handleLabelConfirm(value) {
      let inputValue = value;
      if (inputValue) {
        this.labelList.push(inputValue);
      }
      this.labelVisible = false;
      this.labelValue = '';
    },

    fastAdd(){ // 快速添加规格
      let obj = {
        name:'',
        list:[],
        inputVisible: false,
        inputValue: '',
      }
      this.specsData.push(obj)
    },
    creatRow(){ // 快速添加规格
      let obj = {
        name:'',
        list:[],
        inputVisible: false,
        inputValue: '',
      }
      this.specsData.push(obj)
    },
    specsNameChange(name) { // 修改规格名
      if(!name){
        this.$message.warning('规格名为空，无法更新商品sku')
      }else{
        this.loadGoodsSku()
      }
    },
    loadGoodsSku(){
      this.skuLoading = true
      var arr = this.getCombination(this.specsData)
      this.form.goodsSku = []
      for(var i in arr){
        let obj = {
          price:'', //普通商品显示价格
          salePrice:'', //普通商品显示价格
          stock:'', //普通商品库
          skuCode:'', //sku编号
          rulePath: arr[i], //规格 16G-暗夜白
          image:'', //完整规格的商品主图
          key:'' //图片key
        }
        this.form.goodsSku.push(obj)
      }
      setTimeout(() => {
        this.skuLoading = false
      },1000)
    },
    getCombination(array) {
      let resultArr = [];
      array.forEach((arrItem) => {
        if (resultArr.length === 0) {
          let firstItem = [];
          arrItem.list.forEach(item => {
            firstItem.push([item]);
          })
          resultArr = firstItem
        } else {
          console.log(0, resultArr)
          const emptyArray = [];
          resultArr.forEach((item) => {
            arrItem.list.forEach((value) => {
              emptyArray.push([...item, value])
            })
          })
          resultArr = emptyArray
        }
      });
      return resultArr;
    },
    submit(){
      /* 处理商品多图轮播 */
      this.upload = JSON.parse(JSON.stringify(this.form))
      console.log(this.fileList)
      this.form.images = []
      let imgsArr = []
      let keysArr = []
      this.fileList.forEach((i) =>{ // 添加次图key
        imgsArr.push(i.response.data.download)
        keysArr.push(i.response.data.key)
      })
      this.upload.images = JSON.stringify(imgsArr) //商品轮播图 数组的json格式
      keysArr.push(this.form.mainKey) // 添加主图key
      keysArr.push(this.videoForm.showVideoKey) // 添加视频key
      this.upload.goodsVideo = this.videoForm.showVideoPath
      this.form.goodsSku.forEach((sku) =>{ // 添加商品sku里面有图片的key
        if(sku.key){
          keysArr.push(sku.key)
        }
      })
      this.upload.imageKeys = JSON.stringify(keysArr) // 商品图片key 需要转成数组的json字符串
      this.upload.attributes = JSON.stringify(this.form.attributes)
      this.upload.label = JSON.stringify(this.labelList)
      var specsArr = []
      this.specsData.forEach((item,index) =>{
        let specsOBJ = {}
        specsOBJ['spec' + index] = item.name
        specsOBJ['child'] = []
        this.specsData[index].list.forEach((x,ind) =>{
          let specsX = {}
          specsX.value = x
          specsOBJ['child'].push(specsX)
        })
        specsArr.push(specsOBJ)
      })
      console.log('!!!specs!!!')
      console.log(specsArr)
      console.log('---specs---')
      this.upload.specs = JSON.stringify(specsArr)
      this.upload.additionalServices = JSON.stringify(this.form.additionalServices)
      this.upload.goodsSku = JSON.stringify(this.form.goodsSku)
      console.log(this.upload)
      this.upload.goodsDetail = JSON.stringify(this.form.goodsDetail)
      /* this.upload.goodsType = JSON.parse(this.form.goodsType)
      this.upload.goodsStatus = JSON.parse(this.form.goodsStatus)
      this.upload.freeExpress = JSON.parse(this.form.freeExpress)
      this.upload.guideGoods = JSON.parse(this.form.guideGoods)
      this.upload.goodsType = JSON.parse(this.form.goodsType) */
      this.$api.goodsSave(this.upload).then(res => {
        this.$message.success('添加商品成功！！！')
      })
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
  .avatar-uploader >>> .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .sku-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .sku-uploader >>> .el-upload:hover {
    border-color: #409EFF;
  }
  .sku-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .sku-uploader >>> .avatar {
    width: 78px;
    height: 78px;
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
  .Tinymce_box { /* // 富文本样式 */
    display: flex;
  }
  .editor-content {
    margin-left: 30px;
    flex-grow: 1;
    border: 2px dashed #f1f1f1;
    padding:0 20px;
  }
  h3 {
    color: #808080;
  }
  .goodsFooter{
    width:100%;
    padding: 5px 0;
    background: rgba(0,0,0,0.6);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    text-align: center;
  }
</style>
