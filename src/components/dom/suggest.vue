<template>
    <scroll  class="scroll-result"  :data="result" v-if="result.length" :pullup="pullup" @scrollToEnd="searchMore" >
        <ul class="suggest" ref="scrollWrap">
            <li :Key="key" v-for="(item,key) in result" class="music-results" @click="selectItem(item)">
                <i :class="getCls(item)"></i>
                <p class="text" v-html="getName(item)"></p>
                <!-- {{item}} -->
            </li>
            <div class="loading" v-show="hasMoreRes"></div>
        </ul>    
    </scroll>

</template>

<script>
import {mapMutations} from 'vuex'
import {searchResult} from 'api/search'
import {Singer,filterSinger} from 'common/js/class'
import scroll from 'components/util/scroll'
export default {
    
    props:{
        query:{
            type:String,
            default:''
        },
        showSinger:{
            type:Boolean,
            default:true
        }
    },
    data() {
        return {
            pullup:true,
            page:1,
            perpage:20,
            result:[],
            hasMoreRes:true
        }
    },
    components:{
        scroll,
    },
    // created() {
    //     this.startSearch()
    // },
    watch: {
        query(newquery){
            if(!this.query){  
                this.result = []              
                return
            } 
            this.page = 1            
            this.startSearch()
        }
    },
    methods: {        
        
        startSearch() {  
            this.hasMoreRes = true                            
            searchResult(this.query,this.page,this.showSinger,this.perpage).then((res)=>{
                if(res.code === 0){
                    console.log('year')
                    if(this.page===1){
                        this.result = this.filterData(res.data)
                    }else{
                        this.result = this.result.concat(this.filterData(res.data))
                    }                    
                    this.checkMore(res.data)
                }
            })
        },
        searchMore() {
            // alert('next')
            if(!this.hasMoreRes){
                return
            }
            this.page++
            this.startSearch()
        },
        checkMore(data) {
            const song = data.song
            if(!song.list.length || (song.curnum + (song.curpage-1)*20)>song.totalnum){
                this.hasMoreRes = false
            }
        },
        filterData(data) {
            let ret = []
            if(data.zhida && data.zhida.singerid && this.page===1){
                ret.push({...data.zhida,...{type:'singer'}})
            }
            if(data.song){
                ret = ret.concat(data.song.list)
            }
            return ret
        },
        getCls(item) {
            if(item.type === 'singer'){
                return `fa fa-user`
            }else {
                return 'fa fa-music'
            }
        },
        getName(item) {
            if(item.type === 'singer'){
                return item.singername
            }else{
                return `${item.songname}-${filterSinger(item.singer)}`
            }
        },
        selectItem(item){
            if(item.type === 'singer'){
                const singer = new Singer({
                    id:item.singermid,
                    name:item.singername
                })
                this.$router.push({
                    path: `/search/${singer.id}`                    
                })
                this.setSinger(singer)
            }
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        }) 
    }
}
</script>

<style lang="stylus">
.scroll-result
    // position fixed
    // overflow hidden
    // top 195px
    // bottom 0
    // left 0
    // right 0
    // padding-bottom 10px
    height 100%
    overflow hidden
    background #333        
    .suggest    
        text-align left
        font-size 0.9rem         
        .music-results
            height 25px
            display flex
            justify-content flex-start   
            align-items center 
            font-family  '黑体'
            padding 5px 25px
        i.fa
            margin-right 10px    
        p.text
            text-align left
            white-space nowrap
            overflow: hidden
            text-overflow ellipsis
        .loading
            transform scale(0.8)
</style>


