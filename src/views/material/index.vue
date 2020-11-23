<template>
  <div>
    <el-card class="box-card mt-10">
      <div slot="header" align="center" class="clearfix">
        <span>卡片名称 - {{shopTitle}}</span>
        <el-button v-if="step != 1" @click="backLook" style="float: left; padding: 3px 0" type="text"><i class="el-icon-arrow-left"></i>返回</el-button>
        <el-button v-if="step == 2" @click="backLook" style="float: right; padding: 3px 0" type="text"><i class="el-icon-plus"></i>添加文件夹</el-button>
        <el-button v-if="step == 3" @click="backLook" style="float: right; padding: 3px 0" type="text"><i class="el-icon-plus"></i>添加素材</el-button>
      </div>
      <div class="overflow" v-if="step == 1">
        <div v-for="(item,index) in 4" class="f-l mr-10 mt-10 storeList" @click="lookShop(item)" align="center" style="width: 160px;height: 90px;">
          <div>
            <i class="el-icon-s-shop" style="font-size: 30px;"></i>
          </div>
          <p style="font-size: 14px;">店铺名称{{index == 1?'啊啊啊啊啊啊啊啊啊':''}}</p>
        </div>
      </div>
      <div class="overflow" v-if="step == 2">
        <div v-for="(item,index) in 10" class="f-l mr-10 mt-10 storeList" @click="lookMetarial(item)" align="center" style="width: 160px;height: 90px;">
          <div>
            <i class="el-icon-folder" style="font-size: 30px;"></i>
          </div>
          <p style="font-size: 14px;">新建文件夹{{index}}{{index == 1?'啊啊啊啊啊啊啊啊啊':''}}</p>
        </div>
      </div>
      <div class="overflow" v-if="step == 3">
        <div v-for="(item,index) in 10" class="f-l mr-10 mt-10 storeList" align="center" style="width: 100px;height: 110px;">
          <div>
            <div class="demo-image__preview">
              <el-image
                style="width: 100px; height: 100px"
                :src="url"
                fit="cover"
                :preview-src-list="srcList">
              </el-image>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Material",
    data() {
      return {
        currentPage: 5, // 当前页
        storeList:[],
        shopTitle:'',
        selRow:'',
        step:1, // 1：查看店铺  2：查看店铺素材文件夹  3：查看素材
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
      };
    },
    mounted() {

    },
    methods: {
      lookShop(row){
        this.step = 2
        this.selRow = row
        this.shopTitle = row
      },
      lookMetarial(row) {
        this.step = 3
        this.selRow = row
        this.shopTitle = row
      },
      backLook(){
        this.step--
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },
  };
</script>

<style scoped="">
  .storeList{
    color: #333;
  }
  .storeList:hover{
    cursor: pointer;
    color: #66b1ff;

  }
</style>
