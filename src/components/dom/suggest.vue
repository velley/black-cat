<template>
<scroll class="scroll-result" :data="result" v-if="result.length">
    <ul class="suggest">
        <li :Key="key" v-for="(item,key) in result" class="music-results">
            <i :class="getCls(item)"></i>
            <p class="text" v-html="getName(item)"></p>
            <!-- {{item}} -->
        </li>
    </ul>
</scroll>
</template>

<script>
import {searchResult} from 'api/search'
import {filterSinger} from 'common/js/class'
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
            page:1,
            result:[]
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
            this.startSearch()
        }
    },
    methods: {
        startSearch() {            
            searchResult(this.query,this.page,this.showSinger).then((res)=>{
                if(res.code === 0){
                    console.log('year')
                    this.result = this.filterData(res.data)
                }
            })
        },
        filterData(data) {
            let ret = []
            if(data.zhida && data.zhida.singerid){
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
        }
    }
}
</script>

<style lang="stylus">
.scroll-result
    position fixed
    overflow hidden
    top 195px
    bottom 0
    left 0
    right 0
    padding-bottom 10px
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
</style>


