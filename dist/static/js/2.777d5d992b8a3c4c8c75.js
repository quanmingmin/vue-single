webpackJsonp([2],{Qt9A:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("headerbar",{attrs:{title:t.title}}),t._v(" "),n("div",{staticStyle:{height:"800px"}}),t._v(" "),n("router-link",{attrs:{to:{name:"about",params:{id:5}}}},[t._v("to list-------5")]),t._v(" "),n("button",{on:{click:t.rest}},[t._v("click")]),t._v(" "),t._l(t.list,function(e){return n("p",{staticClass:"example-list-item"},[t._v(t._s(e.title))])}),t._v(" "),n("infinite-loading",{ref:"infiniteLoading",on:{infinite:t.infiniteHandler}},[n("span",{attrs:{slot:"no-results"},slot:"no-results"},[t._v("暂无数据")]),t._v(" "),n("span",{attrs:{slot:"no-more"},slot:"no-more"},[t._v("没有更多数据")])])],2)},staticRenderFns:[]},a=n("Z0/y")({name:"index",data:function(){return{title:"E宠商城d",list:[],page:1}},components:{},created:function(){},methods:{infiniteHandler:function(t){var e=this;this.$EpetJs.Common.get("union/trial/Main.html?petType=dog&cate=0",{page:this.page}).then(function(n){var i=n.data;i.data.list.length?(e.list=e.list.concat(i.data.list),e.page+=1,t.loaded()):t.complete()})},rest:function(){var t=this;this.list=[],this.$nextTick(function(){t.$refs.infiniteLoading.attemptLoad()})}}},i,!1,null,null,null);e.default=a.exports}});