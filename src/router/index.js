import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'
// import Main from '@/components/Main'
// import Card from '@/components/Card'
// import Register from '@/components/Register'
// import Home from '@/components/common/Home'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          redirect: '/login'
      },
      {
          path: '/',
          component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
          meta: { title: '自述文件' },
          children: [
                {
                  path: '/main',
                  component: () => import(/* webpackChunkName: "dashboard" */ '../components/admin/Main.vue'),
                  meta: { title: '系统首页' }
                },
                 {
                     path: '/table',
                     component: () => import(/* webpackChunkName: "table" */ '../components/admin/BaseTable.vue'),
                     meta: { title: '基础表格' }
                 },
                 {
                     path: '/tabs',
                     component: () => import(/* webpackChunkName: "tabs" */ '../components/Tabs.vue'),
                     meta: { title: 'tab选项卡' }
                 },
              {
                  path: '/analysis',
                  component: () => import(/* webpackChunkName: "form" */ '../components/admin/Analysis.vue'),
                  meta: { title: '成绩分析' }
              },
              {
                  // 富文本编辑器组件
                  path: '/editor',
                  component: () => import(/* webpackChunkName: "editor" */ '../components/admin/Edit.vue'),
                  meta: { title: '成绩录入' }
              },
              {
                  // markdown组件
                  path: '/check',
                  component: () => import(/* webpackChunkName: "markdown" */ '../components/admin/Check.vue'),
                  meta: { title: '成绩审核' }
              },
              {
                  // 图片上传组件
                  path: '/upload',
                  component: () => import(/* webpackChunkName: "upload" */ '../components/admin/Upload.vue'),
                  meta: { title: '文件上传' }
              },
            //   {
            //       // vue-schart组件
            //       path: '/charts',
            //       component: () => import(/* webpackChunkName: "chart" */ '../components/admin/Line.vue'),
            //       meta: { title: 'schart图表' }
            //   },
              // {
              //     // 拖拽列表组件
              //     path: '/drag',
              //     component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
              //     meta: { title: '拖拽列表' }
              // },
              {
                  // 拖拽Dialog组件
                  path: '/todo',
                  component: () => import(/* webpackChunkName: "dragdialog" */ '../components/admin/DragList.vue'),
                  meta: { title: '待办事项' }
              },
              {
                  // 联系我页面
                  path: '/permission',
                  component: () => import(/* webpackChunkName: "permission" */ '../components/admin/Permission.vue'),
                  meta: { title: '权限测试', permission: true }
              },
              {
                  path: '/404',
                  component: () => import(/* webpackChunkName: "404" */ '../components/admin/404.vue'),
                  meta: { title: '404' }
              },
              {
                  path: '/smain',
                  component: () => import(/* webpackChunkName: "donate" */ '../components/students/sMain.vue'),
                  meta: { title: '学生页面' }
                },
                {
                    path: '/sanaly',
                    component: () => import(/* webpackChunkName: "403" */ '../components/students/sAnalysis.vue'),
                    meta: { title: '个人成绩分析' }
                },
                {
                    path: '/compute',
                    component: () => import(/* webpackChunkName: "403" */ '../components/admin/compute.vue'),
                    meta: { title: '计算汇总成绩' }
                },
                {
                    path: '/declare',
                    component: () => import(/* webpackChunkName: "403" */ '../components/students/Declare.vue'),
                    meta: { title: '素质成绩申报' }
                },
            ]
      },
      {
          path: '/login',
          component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue'),
          meta: { title: '登录' }
      },
      {
        path: '/register',
        component: () => import(/* webpackChunkName: "login" */ '../components/Register.vue'),
        meta: { title: '注册' }
    },
      {
          path: '*',
          redirect: '/404'
      }
  ]
});
