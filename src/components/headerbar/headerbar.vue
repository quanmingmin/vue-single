<template>
	<div class="headerBox" v-if="showHeader" :class="{ headerBoxFixed: isFixed }">
		<div class="header border-b">
			<div class="headerText textover ft18">{{title}}</div>
			<div class="icon-left-open-big" @click="back"></div>
			<div class="icon-more" @click="showMenu"></div>	
		</div>
		 <transition name="slider">
			<div class="menuBox" v-show="showMenuBox" @click="hideMenu">
				<div class="menuBox-nav flex">
					<a :href="$EpetJs.Common.createUrl('main.html')" class="it1">
						<span class="mNavIco1"></span>
						<div>首页</div>
					</a>
	                <a :href="$EpetJs.Common.createUrl('category.html')" class="it1">
						<span class="mNavIco2"></span>
						<div>商品分类</div>
					</a>
					<a :href="$EpetJs.Common.createUrl('cart')" class="it1">
						<span class="mNavIco3 relative"><i class="numBox" v-if="cartNum > 0">{{cartNum}}</i></span>
						<div>购物车</div>
					</a>
					<a :href="$EpetJs.Common.createUrl('user/UserCenter.html')" class="it1">
						<span class="mNavIco4"></span>
						<div>我的e宠</div>
					</a>
				</div>
			</div>
	    </transition>
	</div>
</template>

<script>
	export default{
		name:'headerbar',
		data(){
			return{
				showMenuBox:false
			}
		},
		props:{
			title:{//标题
				type:String,
				default:'E宠商城'
			},
			showHeader:{//是否显示headerbar
				type:Boolean,
				default:true
			},
			isFixed:{//headerbar是否固定在顶部
				type:Boolean,
				default:false
			}
		},
		methods:{
			back(){
				this.$router ? this.$router.back() : window.history.back()
			},
			showMenu(){
				this.showMenuBox = !this.showMenuBox;
			},
			hideMenu(){
				this.showMenuBox = false;
			}
		},
		computed:{
			cartNum(){
				return this.$store.state.cartNum
			}
		}
	}
</script>
<style scoped>
.headerBoxFixed{ height: 50px;}
.header{ width: 100%; height: 50px; background: #fff; line-height:50px; color: #333; position: relative;}
.headerBoxFixed .header{ position: fixed;; left: 0; top: 0;  z-index: 100;}
.headerText{ text-align: center; margin: 0 65px;}
.headerBox .icon-left-open-big,.headerBox .icon-more{ font-size: 22px; height: 50px; line-height: 50px; position: absolute; top: 0; color: #999; cursor: pointer;}
.headerBox .icon-left-open-big{ left: 0;  padding: 0 0 0 15px; }
.headerBox .icon-left-open-big:active,.headerBox .icon-more:active{ color: #333;}
.headerBox .icon-more{ right: 0; padding: 0 15px 0 0;}
.headerBoxFixed .menuBox{ position:fixed; width: 100%; bottom: 0; left: 0; top:50px;  background: rgba(0,0,0,0.5); z-index: 99;}
.menuBox{ overflow: hidden; }
.menuBox-nav{ height: 65px; background:#fff;}
.menuBox-nav a{ font-size: 14px; color: #666; text-align:center; padding-top:11px; }
.menuBox-nav a:active{ color: #333; }
.mNavIco1,.mNavIco2,.mNavIco3,.mNavIco4{ display:block; margin: auto; width: 25px; height: 25px; background: url(./images/navIco.png) 0 0 no-repeat; background-size: 234px 163px; }
.mNavIco1{ background-position: -172px -7px; }
.mNavIco2{ background-position: -172px -49px; }
.mNavIco3{ background-position: -172px -90px; }
.mNavIco4{ background-position: -172px -133px; }
.slider-enter-active, .slider-leave-active {
  transition: all .2s ease;
  height: 65px;
}
.slider-enter, .slider-leave-to{
  height: 0;
  opacity: 0;
}
.numBox{ display: block; height: 20px; line-height: 20px; background: #ff0000; border-radius: 10px; position: absolute;; right: -18px; top:-5px; color: #fff; font-size: 12px; padding: 0 3px; min-width: 20px; z-index: 100;}
</style>