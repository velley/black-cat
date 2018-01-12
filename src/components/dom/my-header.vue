<template>
<header>
    <img :src="logo">
    <p class="music-name">黑猫音乐</p>
    <i class="user fa fa-2x fa-user-o"></i>
</header>
</template>

<script>
export default {
    data () {
        return {
            logo:require("assets/img/logo.png")
        }
    }
}
</script>

<style lang="stylus">
@import '../../common/style/param'
header
    img
        width 65px
    .music-name
        color #999
        font-size 16px
        font-family '微软雅黑'        
    .user
        color #999
        absolute top 15px right 15px


</style>
