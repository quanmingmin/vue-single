<template>
  <div>
  	<headerbar :title='title'></headerbar>
  	<div style="height:800px"></div>
  	<router-link :to="{name:'about',params:{id:5}}">to list-------5</router-link>
  	<button @click="rest">click</button>
  	<p class="example-list-item" v-for="item in list">{{item.title}}</p>

  	<infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
  		<span slot="no-results">暂无数据</span>
  		<span slot="no-more">没有更多数据</span>
  	</infinite-loading>
  	
</div>
</template>

<script>
export default{
	name:'index',
	data(){
		return {
			title:'E宠商城d',
			list:[],
			page:1
		}
	},
	components:{},
	created(){
		//this.infiniteHandler();
	},
	methods:{
  	infiniteHandler($state){
  		var _self = this;
  		this.$EpetJs.Common.get('union/trial/Main.html?petType=dog&cate=0',{page:this.page}).
  		then( ({data}) =>{
  			
  			if(!data.data.list.length){
  				$state.complete();
  			}else{
  				_self.list = _self.list.concat(data.data.list);
  				_self.page+=1;
  				$state.loaded();
  				// this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
  				
  			}
  		})
  	},
  	rest(){
  		this.list=[];
  		this.$nextTick(() => {
        this.$refs.infiniteLoading.attemptLoad();//重新触发数据加载
      });
  	}
	}
}
</script>
