<template>
    <div class="search-box">
        <i class="fa fa-2x fa-search box-item"></i>
        <input class="search-text box-item" v-model="query" type="text" placeholder="请输入歌曲名称">
        <i v-show="query" class="fa fa-2x fa-times box-item" @click="cleanText"></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            query:''
        }
    },
    methods:{
        cleanText() {
            this.query = ''
        },
        setQuery(text) {
            this.query = text
        }
    },
    created() {
        this.$watch('query',(newquery)=>{
            this.$emit('showQuery',newquery)
        })
    }
}
</script>


<style lang="stylus">
    .search-box
        position relative
        margin 15px auto
        width 90%
        height 35px
        border-radius 10px
        background #555        
        i.fa-search
            position absolute
            left 10px
            top 50%
            transform translate(0,-50%)
        i.fa-times
            position absolute
            right 10px
            top 50%
            transform translate(0,-50%)
        .search-text
            position absolute
            color #999
            width 80%
            height 100%
            font-size 1rem
            left 50%
            top 50%
            transform translate(-50%,-50%)
            border none
            outline:none
            background #555
        
</style>
