import $ from 'jquery'
import axios from 'axios'
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://mallapi.sx.epet.com/v3/';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.interceptors.request.use(
   config =>{
   	  const token = getcookie('session');
   	  config.data = JSON.stringify(config.data);
   	  config.headers = {
   	  	'Content-Type':'application/x-www-form-urlencoded'
   	  }
   	  if(token){
   	  	config.params = {'token':token}
   	  }
   	  return config;
   },
   err => {
   	  return Promise.reject(err);
   }
)

export function get(url,params={}){
	return new Promise((resolve,reject) =>{
		axios.get(url,{
			params:params
		})
		.then(response =>{
			console.log('fdfd')
			resolve(response.data);
		})
		.catch(err =>{
			consol.log('fdfd')
			reject(err)
		})

	})
}

export function post(url,params={}){
	return new Promise((resolve,reject) =>{
		axios.post(url,{
			params:params
		})
		.then(response =>{
			resolve(response.data);
		})
		.catch(err =>{
			reject(err)
		})

	})
}

 export function getcookie(name){
 	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 	if(arr=document.cookie.match(reg)){
 		return unescape(arr[2]);
 	}else {
 		return null;
 	}
 }