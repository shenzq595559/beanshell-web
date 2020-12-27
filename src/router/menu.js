const menu = [
  {
    path: '/index',
    name: '首页度量',
    icon: 'icon-dynamic_fill',
    level: 1,
    sort: 1,
    children: [],
    fixed: false
  },
  {
    path: '/',
    name: '采购管理',
    icon: 'icon-createtask_fill',
    level: 0,
    fixed: false,
    children: [
      {
        path: '/purchaseList',
        name: '采购管理',
        icon: 'icon-dynamic_fill',
        level: 1,
        children: [],
        fixed: false
      },
      {
        path: '/menuList',
        name: '菜单管理',
        icon: 'icon-dynamic_fill',
        level: 1,
        children: [],
        fixed: false
      }
      // {
      //   path: '/chart',
      //   name: 'chart',
      //   icon: 'icon-dynamic_fill',
      //   level: 1,
      //   children: [],
      //   fixed: false
      // },
      // {
      //   path: '/list',
      //   name: 'list',
      //   level: 1,
      //   children: [],
      //   fixed: false
      // },
      // {
      //   path: '/userInfo',
      //   name: 'userInfo',
      //   icon: 'icon-addpeople_fill',
      //   children: [],
      //   fixed: false,
      //   level: 1
      // },
      // {
      //   level: 1,
      //   path: '/userList',
      //   children: [],
      //   fixed: false,
      //   name: 'userList'
      // },
      // {
      //   level: 1,
      //   path: '/table',
      //   name: 'table',
      //   children: [],
      //   fixed: false,
      //   hidden: true
      // },
      // {
      //   level: 1,
      //   path: '/icon',
      //   name: 'icon',
      //   children: [],
      //   fixed: false,
      //   icon: 'icon-emoji_fill'
      // },
      // {
      //   level: 1,
      //   path: '/filter',
      //   name: 'filter',
      //   children: [],
      //   fixed: false,
      //   icon: 'icon-emoji_fill'
      // }
    ]
  },
  {
    path: '/',
    name: '员工管理',
    level: 0,
    icon: 'icon-manage_fill',
    fixed: false,
    children: [
      // {
      //   level: 1,
      //   path: '/error404',
      //   children: [],
      //   fixed: false,
      //   name: '404'
      // },
      // {
      //   path: '/userInfo',
      //   name: 'userInfo',
      //   icon: 'icon-addpeople_fill',
      //   children: [],
      //   fixed: false,
      //   level: 1
      // },
      // {
      //   level: 1,
      //   path: '/login',
      //   children: [],
      //   fixed: false,
      //   name: '登录'
      // },
      // {
      //   level: 1,
      //   path: '/register',
      //   children: [],
      //   fixed: false,
      //   name: '注册'
      // }
    ]
  }
]

export default menu
