import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                },
                {
                    path:'/cusManage',
                    component: resolve => require(['../components/page/CusManage/CusManagement.vue'], resolve),
                    meta: { title: '客户列表' }
                },
                {
                    path:'/cusEdit',
                    component: resolve => require(['../components/page/CusManage/CusEdit.vue'], resolve),
                    meta: { title: '客户编辑' }
                },
                {
                    path:'/cusCreate',
                    component: resolve => require(['../components/page/CusManage/CusCreate.vue'], resolve),
                    meta: { title: '添加客户' }
                },
                {
                    path:'/engrManage',
                    component: resolve => require(['../components/page/EngrManage/EngrManagement.vue'], resolve),
                    meta:{ title:'管理员列表' }
                },
                {
                    path:'/engrCreate',
                    component: resolve => require(['../components/page/EngrManage/EngrCreate.vue'], resolve),
                    meta:{ title:'添加管理员' }
                },
                {
                    path:'/serviceManage',
                    component: resolve => require(['../components/page/ServiceManage/ServiceManagement.vue'], resolve),
                    meta:{ title:'服务单列表' }
                },
                {
                    path:'/serviceCreate',
                    component: resolve => require(['../components/page/ServiceManage/ServiceCreate.vue'], resolve),
                    meta:{ title:'新增服务单' }
                },
                {
                    path:'/contractCreate',
                    component: resolve => require(['../components/page/ContractManage/ContractCreate.vue'], resolve),
                    meta:{ title:'添加合同' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
