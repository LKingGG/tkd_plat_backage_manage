<template>
  <div>
    <div class="overflow mt-10">
      <div class="f-l">
        下单时间：
        <el-date-picker
          v-model="value2"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          size="small">
        </el-date-picker> -
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          size="small">
        </el-date-picker>
        <el-button size="small" type="primary" class="ml-10">搜索</el-button>
      </div>
      <div class="f-r">
        <el-button type="primary" size="small" icon="el-icon-date">导出数据</el-button>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card" class="mt-10" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in activeList" :label="item" :name="index"></el-tab-pane>
    </el-tabs>
    <el-table
      id="order_table"
      :data="tableData"
      :default-expand-all="true"
      :stripe="true"
      :header-cell-style="{background:'rgb(250,250,250)'}"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.orders" :span-method="arraySpanMethod" border style="width: 100%">
            <el-table-column label="商品主图">
              <template slot-scope="scope">
                <img :src="scope.row.goods.mainPic" alt="" style="max-width: 100px;max-height: 100px;">
              </template>
            </el-table-column>
            <el-table-column label="商品名称"><template slot-scope="goods"><span>{{ goods.row.message.name }}</span></template></el-table-column>
            <el-table-column label="款式"><template slot-scope="goods"><span>商品编码：{{ goods.row.goods.code }}</span></template></el-table-column>
            <el-table-column label="单价"><template slot-scope="goods"><span>{{ goods.row.goods.price }}</span></template></el-table-column>
            <el-table-column label="数量"><template slot-scope="goods"><span>{{ goods.row.quantity }}</span></template></el-table-column>
            <el-table-column label="实收金额"><template slot-scope="goods"><p>{{ props.row.payPrice }}</p><p>含运费({{ props.row.yfPrice }})</p><p>优惠券减免({{ props.row.discount }})</p><p>活动减免({{ props.row.actPrice }})</p></template></el-table-column>
            <el-table-column label="活动"><template slot-scope="goods"><span>{{ goods.row.activityName?goods.activityName:'无' }}</span></template></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="orderNumber" label="订单编号" width="180" align="center" />
      <el-table-column prop="createdTime" label="下单时间" width="180" align="center" />
      <el-table-column prop="payTime" label="付款时间" align="center" />
      <el-table-column prop="name" label="收货人" align="center" />
      <el-table-column prop="buyerAddress" label="收货站点" align="center" />
      <el-table-column prop="yuJiFinishTime" label="预计到站时间" align="center" />
      <el-table-column label="售后" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.refundStatus == 1" type="" size="small" @click="reviewProp = true; reviewData = scope.row.refundOrder; reviewPrice = scope.row.payPrice">审核退款</el-button>
          <el-button v-else-if="scope.row.refundStatus == 3" type="text">退款成功</el-button>
          <el-button v-else-if="scope.row.orderStatus > 1 && scope.row.orderStatus < 9" size="mini" type="warning" @click="showFastBackBtn(scope.row)">一键退款</el-button>
          <el-button v-else-if="scope.row.refundStatus == 4" type="text">退款失败</el-button>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center"><template slot-scope="scope"><span>{{ activeList[scope.row.orderStatus] }}</span></template></el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="orderDetailBtn">订单详情</el-button><br />
          <el-popconfirm
            title="确定要删除该订单吗？"
            @onConfirm="writeOff(scope.row)"
          >
            <el-button slot="reference" type="text" class="c-red padding-0" size="small">删除订单</el-button>
          </el-popconfirm><br />
          <el-button type="text" size="small" class="c-666" @click="dialogVisible = true">备注</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="订单详情"
      :visible.sync="dialogDetail"
      width="60%">
      <div>
        <el-card class="box-card" shadow="hover">
          <el-steps :active="2" align-center>
            <el-step title="买家下单" icon="el-icon-tickets" description="2020-01-01 12:00:00"></el-step>
            <el-step title="买家付款" icon="el-icon-coin" description="2020-01-01 12:00:00"></el-step>
            <el-step title="商家发货" icon="el-icon-box" description="2020-01-01 12:00:00"></el-step>
            <el-step title="交易完成" icon="el-icon-document-checked" description="2020-01-01 12:00:00"></el-step>
          </el-steps>
        </el-card>
        <el-card class="box-card overflow mt-10" shadow="hover">
          <div class="f-l detailOrderMsg">
            <p><b>订单信息</b></p>
            <div class="detailOrderMsgChild">
              <p>订单编号：0000000000</p>
              <p>订单类型：1111111111</p>
              <p>付款方式：2222222222</p>
              <p>买家：333333</p>
            </div>
            <el-divider></el-divider>
            <div class="detailOrderMsgChild">
              <p>店铺信息：4444444444</p>
              <p>配送方式：5555555555</p>
              <p>配送时间：6666666666</p>
              <p>收货信息：7777777777</p>
              <p>买家留言：此订单没有留言</p>
              <p>卖家备注：888888888</p>
            </div>
          </div>
          <div class="f-l detailOrderStatus">
            <div class="f-l mr-10" style="height: 80px;">
              <i class="el-icon-warning-outline c-blue" style="font-size: 40px;"></i>
            </div>
            <p>
              <span class="c-666">订单状态：已完成</span>
            </p>
            <el-button type="primary" size="mini" @click="dialogVisible = true">备注</el-button>
            <el-divider></el-divider>
            <div class="c-999 ml-50">
              <p>如果无法发货，请及时与买家联系并说明情况后进行退款；</p>
              <p>买家申请退款后，须征得买家同意后再发货，否则买家有权拒收货物；</p>
              <p>买家付款后超过7天仍未发货，将有权申请客服介入发起退款维权；</p>
            </div>
          </div>
        </el-card>
        <el-table :data="orders" class="mt-10" :span-method="arraySpanMethod" border style="width: 100%">
          <el-table-column label="商品主图">
            <template slot-scope="scope">
              <img :src="scope.row.goods.mainPic" alt="" style="max-width: 100px;max-height: 100px;">
            </template>
          </el-table-column>
          <el-table-column label="商品名称"><template slot-scope="goods"><span>{{ goods.row.message.name }}</span></template></el-table-column>
          <el-table-column label="款式"><template slot-scope="goods"><span>商品编码：{{ goods.row.goods.code }}</span></template></el-table-column>
          <el-table-column label="单价"><template slot-scope="goods"><span>{{ goods.row.goods.price }}</span></template></el-table-column>
          <el-table-column label="数量"><template slot-scope="goods"><span>{{ goods.row.quantity }}</span></template></el-table-column>
          <el-table-column label="实收金额"><template slot-scope="goods"><p>{{ props.row.payPrice }}</p><p>含运费({{ props.row.yfPrice }})</p><p>优惠券减免({{ props.row.discount }})</p><p>活动减免({{ props.row.actPrice }})</p></template></el-table-column>
          <el-table-column label="活动"><template slot-scope="goods"><span>{{ goods.row.activityName?goods.activityName:'无' }}</span></template></el-table-column>
        </el-table>
        <el-card class="box-card overflow mt-10" shadow="hover">
          <div slot="header" class="clearfix">
            <span>订单日志</span>
          </div>
          <div class="c-666">
            <p>操作备注：S 于2020-10-21 12:59:59 【交易完成】</p>
          </div>
        </el-card>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDetail = false" type="text" size="mini">关 闭</el-button>
        <el-button type="primary" class="ml-10" @click="dialogDetail = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="备注信息"
      :visible.sync="dialogVisible"
      width="30%">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="text" size="mini">关 闭</el-button>
        <el-button type="primary" class="ml-10" @click="dialogVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'GeneralOrder',
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value1: '',
      value2: '',
      textarea: '',
      activeList:['全部','待付款','待发货','已发货','已收货','已完成','已关闭','退款中'],
      activeName: '0',
      tableData:[{
        orders:[{
          goods:{
            mainPic:'1',
            code:'1',
            price:'1'
          },
          message:{
            name:'1'
          },
          quantity:'123',
          payPrice:'6',
          yfPrice:'5',
          discount:'4',
          actPrice:'3'
        }],
        orderNumber:'123123',
        createdTime:'2020',
        payTime:'10-23',
        name:'name',
        buyerAddress:'buyerAddress',
        yuJiFinishTime:'yuJiFinishTime',
        refundStatus:'1',
        orderStatus:'1'
      }],
      dialogVisible: false,
      dialogDetail: false,
      orderDetailData:'',
    }
  },
  mounted() {

  },
  methods: {
    orderDetailBtn(){ // 订单详情按钮
      this.orderDetailData = this.tableData[0]
      this.dialogDetail = true
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex > 4) {
          var mergeNum = row.goodsNum
          return {
            rowspan: mergeNum,
            colspan: 1
          }
        } else {
          return {
            rowspan: 1,
            colspan: 1
          }
        }
      } else {
        if (columnIndex > 4) {
          return {
            rowspan: 0,
            colspan: 0
          }
        } else {
          return {
            rowspan: 1,
            colspan: 1
          }
        }
      }
    },
  }
}
</script>

<style scoped="scoped">
  .detailOrderMsg{
    color: #666;
    padding-right: 20px;
    margin-bottom: 10px;
    width: 320px;
    border-right: 1px solid rgb(235,238,245);
  }
  .detailOrderMsgChild{
    box-sizing: border-box;
    padding: 0 0 0 20px;
  }
  .detailOrderStatus{
    width: calc(100% - 330px);
    padding-left: 20px;
  }
</style>
