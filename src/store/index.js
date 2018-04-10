import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'
Vue.use(Vuex)
const state = {
	isLogin:false,//用户是否登陆
	Loading:false,//页面加载时菊花的状态
	cartNum:0//购物车数量
}

const mutations = {//只能通过(commit)mutations里边的方法来修改state里边的数据(同步方法)
	Login (state,data) {//修改登陆状态方法
      state.isLogin = data.isLogin
    },
    loading(state,data){//修改菊花状态方法
    	state.Loading = data.Loading
    }
  }

 const getters = {//store的计算属性
 	filterData(state,gttters){
 		return state.isLogin
 	}
 } 

 const actions = {//actions只能提交(dispatch)mutations里边的方法来修改state的数据(异步方法)
	changeData({commit}){//context是store的实例，context.state可以获取到state里边的属性
		commit('add')
	},
	loading({commit},data){//异步修改菊花转方法
		setTimeout(() =>{
			commit('loading',data)
		},200)
	}
}
 const store = new Vuex.Store({
 	state,
 	mutations,
 	getters,
 	actions,
 	plugins: [vuexAlong]
 }) 
 export default store