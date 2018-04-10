export default {
	install(Vue,options){
		Vue.prototype.$msg = function(){
			window.alert(158)
		}

		Vue.directive('scroll', {
	// 当被绑定的元素插入到 DOM 中时……
	bind: function (el, binding){
		var _self = this;
		var allowscroll = false;
		window.addEventListener('scroll',function(){
			console.log('scroll')
		})
	}
})

	}
}