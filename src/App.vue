<template>
  <div id="app">
      <eloading :showLoading="isLoading"></eloading>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>


<script>
import eloading from '@/components/eloading/eloading'
import router from './router'
export default {
  name: 'App',
  data(){
    return {
      
    }
  },
  components:{eloading},
  computed:{
    isLoading(){
      return this.$store.state.Loading
    }
  }
}
</script>
<style>

</style>

