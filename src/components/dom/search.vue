<template>
    <div class="search">
        <search-box ref="searchBox" @showQuery="getQuery"></search-box>
        <div class="suggest-box" ref="suggestBox" v-show="query">
            <suggest :query="query" ref="suggest"></suggest>
        </div>
        <div class="hot-keys">
            <h3 class="hot-title">热门搜索：</h3>
            <div class="keys-item-container">
                <span class="keys-item" :key="key" v-for="(item,key) in hotkey" @click="addQuery(item.k)">
                    {{item.k}}
                </span>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>

import searchBox from 'components/util/search-box'
import {getHotKey} from 'api/search'
import suggest from 'components/dom/suggest'
import {playMixin} from 'common/js/playMixin'
export default {
    mixins: [playMixin],
    data() {
        return {
            hotkey:[],
            query:''
        }
    },
    created() {
        this.getHotKey()
    },
    components:{
        searchBox,
        suggest
    },
    methods:{
        handleList(playlist) {
            if(playlist.length>0){
                console.log('iss')  
                console.log(this)              
                this.$refs.suggestBox.style.bottom = '60px'
            }
        },
        getHotKey() {
            getHotKey().then((res)=>{
                if(res.code === 0){
                    console.log('热门搜索为')
                    console.log(res.data.hotkey)
                    this.hotkey = res.data.hotkey.slice(0,10)
                }
            })
        },
        getQuery(data){
            this.query = data
        },
        addQuery(text){
            this.$refs.searchBox.setQuery(text)
            this.query = text
        },
        
    }
}
</script>

<style lang="stylus">
    .search
        .hot-keys
            h3.hot-title
                text-align left 
                padding 0 25px
            .keys-item-container
                width 100%                
                padding 10px 20px
                box-sizing border-box
                overflow hidden
                text-align left                  
                .keys-item
                    display inline-block
                    margin 5px
                    padding 5px
                    min-width 40px
                    height 20px
                    line-height 20px
                    text-align center
                    background #444
                    border-radius 5px   
        .suggest-box
            position fixed
            overflow hidden
            top 195px
            bottom 0
            left 0
            right 0
            padding-bottom 10px           
</style>
