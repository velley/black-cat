<template>
  <div id="app">
    <my-header></my-header>
    <my-nav></my-nav>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>  
</template>

<script>
import myHeader from './components/dom/my-header'
import myNav from './components/dom/my-nav'
import player from './components/dom/player'

export default {
  components:{
    myHeader,
    myNav,
    player
  },
  name: 'app'
}
</script>

<style lang="stylus">
#app    
    -webkit-font-smoothing antialiased;
    -moz-osx-font-smoothing grayscale;
    height 100%
    border 1px solid #999
    text-align center;    
    padding-top 10px;    
    // justify-content flex-start
  

</style>
