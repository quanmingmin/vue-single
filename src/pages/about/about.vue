<template>
	<div>
		<headerbar></headerbar>
		<router-link :to="{name:'about',params:{id:$route.params.id}}">to list-------{{num}}--------id:{{query}}</router-link>
        <router-link to="/">to index</router-link>
	</div>
</template>
<script>
export default{
	name:'about',
	data(){
		return {
			title:'quanmingmin',
			num:0
		}
	},
	components:{},
	props: ['query'],
	created(){
		this.num = this.$route.params.id
		// this.$EpetJs.Common.get('union/trial/Report.html?do=Detail&trid=742',{issite:true})
		// .then(function(data){ console.log(data.config.params.issite)})
		//alert(1)
	},
	// beforeRouteUpdate(to, from, next){
	// 	//this.num = this.$route.params.id
	// 	next()
	// } 
	watch:{
		'$route'(to,from){
			this.num = this.$route.params.id
		}
	}
}	
</script>
<style scoped>
	.router-link-active{
		color: red
	}
</style>