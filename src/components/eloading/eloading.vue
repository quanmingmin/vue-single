<template>
	<div v-if="showLoading">
		<div class="eloading">
			<div></div>
		</div>
	</div>
</template>
<script>
export default{
	name:'eloading',
	props:{
			showLoading:{//是否显示headerbar
				type:Boolean,
				default:true
			}
		}
}	
</script>
<style scoped>
.eloading{ width: 40px; height: 40px; background: url(./images/e-loading.png) 0 0 no-repeat; background-size: contain; position: fixed; left: 50%; top:50%; margin: -20px 0 0 -20px; opacity: 0.5;}
.eloading div{ width: 40px; height:40px; background: url(./images/e-loading-move.png) 0 0 no-repeat; background-size: contain; position: absolute; left: 0; top: 0;  animation: rotation 1.5s linear infinite;}
@-webkit-keyframes rotation{
from { transform: rotate(0deg);}
to { transform: rotate(360deg);}
}

</style>