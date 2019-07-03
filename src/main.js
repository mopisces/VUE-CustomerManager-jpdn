import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import store from './store/store';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import '../static/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
//import api from './request/api/';

Vue.use(ElementUI, { size: 'small' });

new Vue({
    router,
    //store,
    render: h => h(App)
}).$mount('#app');