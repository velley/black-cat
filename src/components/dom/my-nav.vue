<template>
    <nav>
        <router-link :key="key" v-for="(item,key) in navTitles" tag="div" :to="item.href" class="nav-item" active-class="on">
            <span>{{item.name}}</span>
        </router-link>
    </nav>
</template>

<script>
export default {
    data (){
        return{
            navTitles:[
                {
                    name:'推荐',
                    href:'/recomend'
                },
                {
                    name:'歌手',
                    href:'/singer'
                },
                {
                    name:'排行',
                    href:'/rank'
                },
                {
                    name:'搜索',
                    href:'/search'
                },
            ]
        }
    }
}
</script>

<style scoped lang="stylus">
nav
    display flex
    min-height 30px
    width 100%
    line-height 30px
    margin-top 15px 
    
    .nav-item
        flex 1
        text-align center
        font-size 15px
        span 
            padding 5px 0px
        &.on
            span
                border-bottom 2px solid #ccc
        

</style>
