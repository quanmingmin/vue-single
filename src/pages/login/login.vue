<template>
	<div>
		<div class="imgBox relative">
			<div class="loginTop pl15 pr15 flex flex-ac">
				<div class="icon-left-open-big" @click="back"></div>
				<div class="it1 ftr">
					<a :href="$EpetJs.Common.createUrl('wap:register.html')" class="afff ft15">注册</a>
				</div>
			</div>
			<img src="./images/loginBanner.png">
			<div class="loginLogo"><img src="@/assets/logo.png"></div>
			<div class="loginLayer1 flex">
				<div class="it1" @click="loginSelect" :class="{ active: index==0 }" index="0">普通登录</div>
				<div class="it1" @click="loginSelect" :class="{ active: index==1 }" index="1">动态密码登录</div>
			</div>
		</div>
		<group v-show="index==0">
      		<x-input title="手机号/邮箱/用户名" placeholder="手机号/邮箱/用户名" class="ft15" is-type="china-mobile">
      			<img slot="label" style="display:block;" class="mr15" src="./images/ico1.png" width="16" height="20">
      		</x-input>
			<x-input title="密码" placeholder="请输入密码" class="ft15" type="password">
      			<img slot="label" style="display:block;" class="mr15" src="./images/ico4.png" width="16" height="20">
      		</x-input>
    	</group>
    	<group v-show="index==1">
			<x-input title="手机号" placeholder="已注册手机号" class="ft15" is-type="china-mobile">
      			<img slot="label" style="display:block;" class="mr15" src="./images/ico1.png" width="16" height="20">
      		</x-input>
      		<x-input title="验证码" placeholder="请输入图片内容" class="ft15" type="password">
      			<img slot="label" style="display:block;" class="mr15" src="./images/ico4.png" width="16" height="20">
            	<img slot="right-full-height" src="https://wap.epet.com/share/seccode.html?hash=0.46319180845197616&height=44">
      		</x-input>
      		<x-input title="发送验证码" class="weui-vcode ft15" placeholder="请输入动态密码">
      			<img slot="label" style="display:block;" class="mr15" src="./images/ico4.png" width="16" height="20">
        		<x-button slot="right" type="primary" mini>发送验证码</x-button>
     		</x-input>
    	</group>
    	<div class="pl15 pr15 pt10">
    		 <div class="ftr ft13 pb10">
    		 	<a href="#" class="a666">忘记密码？</a>
    		 </div>
    		<a class="btn btn-large submit-button btn-block" href="javascript:">登录</a>
    	</div>
	</div>
</template>
<script>
import { XInput,Group,XButton} from 'vux'
export default{
	name:'login',
	components: { XInput ,Group,XButton},
	data(){
		return{
			index:0
		}
	},
	methods:{
		back(){
			this.$router ? this.$router.back() : window.history.back()
		},
		loginSelect(e){
			this.index = e.target.getAttribute('index');
		}
	},
}
</script>
<style scoped>
.loginLogo{ position: absolute; top: 36%; left: 0; width: 100%;}
.loginLogo img{ width: 20%; margin: auto;}
.loginTop{ height: 50px; line-height: 50px; position: absolute; width: 100%; left: 0; top: 0; color: #fff;}
.loginTop .icon-left-open-big{ font-size: 20px;}
.loginLayer1{ background: #fff; background: rgba(255,255,255,0.3); position: absolute; left: 0; bottom: 0; width: 100%; height: 44px;}
.loginLayer1 > div{ height: 44px; line-height: 44px; color: #fff; text-align: center; position: relative;}
.loginLayer1 > div:after{ content: ''; display:none; width: 0; height: 0; border:transparent solid 10px; border-bottom:#fff solid 10px; position: absolute; left: 50%; bottom: 0; margin-left: -10px;}
.loginLayer1 > div.active:after{ display:block; }

</style>
<style>
body{ background: #fff; }
.weui-cells{ margin: 0 !important; }
.weui-cells:before{ border:none !important; }
</style>