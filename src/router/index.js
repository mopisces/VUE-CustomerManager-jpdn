import Vue from 'vue'
import Router from 'vue-router'

const index = r => require.ensure([], () => r(require('@/components/common/Index')), 'Indx');
Vue.use(Router);
let routes = [
	{
        path: '/',
        name: 'index',
        component: index,
    },
];
let router = new Router({
    routes: routes,
    mode: 'history'
});

export default router;