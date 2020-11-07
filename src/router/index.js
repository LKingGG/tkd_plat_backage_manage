import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/material',
    children: [{
      path: 'material',
      name: 'Material',
      component: () => import('@/views/material/index'),
      meta: { title: '素材管理', icon: 'el-icon-picture-outline-round' }
    }]
  },
  {
    path: '/store',
    component: Layout,
    name: 'Store',
    meta: { title: '店铺管理', icon: 'el-icon-s-shop' },
    children: [
      {
        path: 'list',
        name: 'StoreList',
        component: () => import('@/views/store/list'),
        meta: { title: '店铺列表', icon: 'el-icon-document' }
      },
      {
        path: 'level',
        name: 'StoreLevel',
        component: () => import('@/views/store/level'),
        meta: { title: '店铺等级', icon: 'el-icon-medal' }
      },
      {
        path: 'audit',
        name: 'StoreAudit',
        component: () => import('@/views/store/audit'),
        meta: { title: '店铺审核', icon: 'el-icon-view' }
      },
      {
        path: 'group',
        name: 'StoreGroup',
        component: () => import('@/views/store/group'),
        meta: { title: '店铺分组', icon: 'el-icon-office-building' }
      },
      {
        path: 'cashout',
        name: 'StoreCashout',
        component: () => import('@/views/store/cashout'),
        meta: { title: '店铺提现', icon: 'el-icon-money' }
      },
      {
        path: 'add',
        name: 'StoreAdd',
        component: () => import('@/views/store/add'),
        meta: { title: '店铺添加', icon: 'el-icon-circle-plus-outline' }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    name: 'Store',
    meta: { title: '商品管理', icon: 'el-icon-s-shop' },
    children: [
      {
        path: 'list',
        name: 'StoreList',
        component: () => import('@/views/goods/goodsList/goodsList'),
        meta: { title: '商品列表', icon: 'el-icon-document' }
      },
      {
        path: 'level',
        name: 'StoreLevel',
        component: () => import('@/views/goods/goodsClass/goodsClass'),
        meta: { title: '商品分类', icon: 'el-icon-medal' }
      },
      {
        path: 'audit',
        name: 'StoreAudit',
        component: () => import('@/views/goods/goodsBrand/goodsBrand'),
        meta: { title: '商品品牌', icon: 'el-icon-view' }
      },
      {
        path: 'group',
        name: 'StoreGroup',
        component: () => import('@/views/store/group'),
        meta: { title: '商品类型', icon: 'el-icon-office-building' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: 'Order',
    meta: { title: '订单管理', icon: 'el-icon-tickets' },
    children: [
      {
        path: 'general',
        name: 'generalOrder',
        component: () => import('@/views/order/generalOrder/generalOrder'),
        meta: { title: '普通订单', icon: 'el-icon-notebook-1' }
      }, {
        path: 'group',
        name: 'groupOrder',
        component: () => import('@/views/order/groupOrder/groupOrder'),
        meta: { title: '拼团订单', icon: 'el-icon-notebook-2' }
      }
    ]
  },
  {
    path: '/menber',
    component: Layout,
    name: 'Menber',
    meta: { title: '会员管理', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'list',
        name: 'menberList',
        component: () => import('@/views/member/memberList/memberList'),
        meta: { title: '会员列表', icon: 'el-icon-user' }
      }, {
        path: 'level',
        name: 'memberLevel',
        component: () => import('@/views/member/memberLevel/memberLevel'),
        meta: { title: '会员等级', icon: 'el-icon-postcard' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    name: 'Setting',
    meta: { title: '网站管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'advert',
        name: 'AdvertSet',
        component: () => import('@/views/setting/advertSet/advertSet'),
        meta: { title: '广告设置', icon: 'el-icon-s-platform' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: { title: '系统设置', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'paySet',
        name: 'PaySet',
        component: () => import('@/views/system/paySet/paySet'),
        meta: { title: '支付配置', icon: 'el-icon-money' }
      }, {
        path: 'msgSet',
        name: 'MsgSet',
        component: () => import('@/views/system/msgSet/msgSet'),
        meta: { title: '短信配置', icon: 'el-icon-message' }
      }, {
        path: 'outPrice',
        name: 'OutPrice',
        component: () => import('@/views/system/outPrice/outPrice'),
        meta: { title: '提现设置', icon: 'el-icon-coin' }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    name: 'Admin',
    meta: { title: '管理员设置', icon: 'el-icon-s-custom' },
    children: [
      {
        path: 'adminList',
        name: 'AdminList',
        component: () => import('@/views/admin/adminList/adminList'),
        meta: { title: '管理员列表', icon: 'el-icon-tickets' }
      }, {
        path: 'roleList',
        name: 'RoleList',
        component: () => import('@/views/admin/roleList/roleList'),
        meta: { title: '角色列表', icon: 'el-icon-view' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
