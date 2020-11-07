<template>
  <div>
    <el-tabs v-model="activeName" class="mt-10" type="card" @tab-click="handleClick">
      <el-tab-pane label="出售中" name="0"></el-tab-pane>
      <el-tab-pane label="已下架" name="1"></el-tab-pane>
      <el-tab-pane label="库存预警" name="2"></el-tab-pane>
      <el-tab-pane label="回收站" name="3"></el-tab-pane>
    </el-tabs>
    <div class="overflow">
      <div class="f-l">
        <el-button type="primary" size="mini">发布商品</el-button>
        <el-button size="mini">批量删除</el-button>
        <el-button size="mini">上架</el-button>
        <el-button size="mini">下架</el-button>
      </div>
      <div class="f-r">
        商品分类：
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ checkStrictly: true }"
          @change="handleChange"
          size="mini"></el-cascader>
        商品名称：<el-input size="mini" class="w-150"></el-input>
        商品编码：<el-input size="mini" class="w-150"></el-input>
        商品类型：<el-select v-model="value" size="mini" placeholder="请选择"><el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
          </el-option></el-select>
        <el-button size="mini" type="primary">搜索</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="商品名称">
        <template slot-scope="scope">
          <div>商家编码：123123123132  创建时间：2020-11-06 25:61:61</div>
          <div class="overflow" align="left">
            <div class="f-l mt-20 mr-20">
              <el-button type="primary" :icon="scope.row.icon" style="font-size: 24px;"></el-button>
            </div>
            <div class="f-l">
              <p>{{scope.row.type}}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="价格"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="总库存"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="销量"
        width="90"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="所属商家"
        width="90"
        align="center">
      </el-table-column>
      <el-table-column
        label="实物类型"
        width="100"
        align="center">
        <template slot-scope="scope">
          <i class="el-icon-success c-blue" style="font-size: 22px;"></i>
          <i class="el-icon-close-notification" style="font-size: 22px;"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="所属商家"
        width="90"
        align="center">
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        label="操作">
        <template slot-scope="scope">
          <div>
          <el-button type="text" @click="dialogVisible = true">编辑</el-button>
          <el-button type="text" @click="modelProp = true">复制</el-button>
          <el-button type="text">删除</el-button>
          </div>
          <div>
            <el-button type="text">下架</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      tableData: [
        {
          name: '666',
          icon: 'el-icon-picture-outline',
          type: '短信通知',
          status: 0,
          tips: '使用该功能需开通阿里云短信业务'
        }
      ],
      activeName: '0',
      value: [],
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
      typeList: [{
        value: '0',
        label: '实物商品'
      }, {
        value: '1',
        label: '虚拟商品'
      }],
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
