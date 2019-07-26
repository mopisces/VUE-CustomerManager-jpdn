//统一管理接口
import axios from 'axios' 
import store from '../store/store.js'
import router from '../router'
import md5 from 'js-md5'
import Vue from 'vue'
import base from './api/base';


Vue.use(ToastPlugin, {position: 'middle'})



/**
 * [错误提示]
 * @param  {[object]} data [错误信息]
 * @return {[object]}      [vux toast对象]
 */
const tip = data => {
    Vue.$vux.toast.show({
        text: data.text,
        type:'warn'
    })
}

//登录重定向
const toLogin = () => {
	router.push('/login')
}
/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status,message) => {
    // token过期
   if( status === 409 )
   {
		instance.post(`${base.domain}refreshToken`).then((res)=>{
			if(res.data.code == 200){
				store.commit('userLogin',res.data.list)
				router.push('/home')
			}
		})
   }
   //refresh_token 过期
   if( status === 410 )
   {
		tip({text:'登录过期，请重新登录'})
		store.commit('setLoginStatus',0)
		toLogin()
   }
   //内部错误
   if( status === 500 ){
		tip({text:'服务器错误，请稍后再试'})
		store.commit('setLoginStatus',0)
		toLogin()
   }
   //参数错误
   if( status === 401 ){
		tip({text:'参数错误，请重新登录'})
		store.commit('setLoginStatus',0)
		toLogin()
   }
   if( status === 403 ){
	   router.push('/403')
   }
   if( status === 404 ){
	   router.push('/404')
   }

}
/**
 * [instance 创建axios对象]
 * @type {[object]}
 */
var instance = axios.create()
instance.defaults.timeout = 5000
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
/** 
 * 请求拦截器 
 */
instance.interceptors.request.use(
	config => { 
		let params = ''
		if( store.state.userInfo.access_token != '' && store.state.userInfo.refresh_token != '' ){
			let Base64 = require('js-base64').Base64
			params = Base64.encode(store.state.appid + ':' + store.state.userInfo.access_token + ':' + store.state.userInfo.refresh_token)
		}
		const authentication = 'userInfo ' + params
		config.headers.authentication = authentication
		config.cancelToken = axios.CancelToken.source().token	
		return config
	},
	error => Promise.error(error)
);

/** 
 * 响应拦截器 
 */
instance.interceptors.response.use(
	res =>{
		console.dir(res)
        return res.status === 200 ? Promise.resolve(res) : Promise.reject(res)
    }, 
	error => {
		console.dir(error)
		const { response } = error;
		if (response) {
			console.dir(response)
			errorHandle(response.status, response.data)
			return Promise.reject()
		}
	}
);

export default instance;