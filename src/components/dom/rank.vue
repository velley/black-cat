<template>
    <div class="rank" ref="rank">
        <scroll :data="topList" class="rank-scroll" ref="rankScroll">
        <ul>
            <li class="rank-types" :key="key" v-for="(item,key) in topList" @click="selectRank(item)">
                <div class="left-img">
                    <img v-lazy="item.picUrl" alt="">
                </div>
                <div class="right-content">
                    <p class="rank-songs" :key="index" v-for="(song,index) in item.songList">
                        <span class="song-index">{{index+1}}</span>
                        <span class="song-name">{{song.songname}} - {{song.singername}}</span>
                    </p>
                </div>
            </li>            
        </ul>
        </scroll>
        <div class="loading" v-show="!topList.length"></div>
        <router-view></router-view>
    </div>
</template>

<script>
import {playMixin} from 'common/js/playMixin'
import {getTopList} from 'api/rank.js'
import {mapMutations} from 'vuex'
import scroll from 'components/util/scroll'
export default {
    mixins: [playMixin],
    data() {
        return {
            topList:[]
        }
    },
    created() {
        this.getTopList()
    },
    components:{
        scroll
    },
    methods: {
        getTopList() {
            getTopList().then((res)=>{
                if(res.code===0){
                    console.log('the rank is')
                    console.log(res.data)
                    this.topList = res.data.topList
                }
            })
        },
        selectRank(item) {
            this.$router.push({
                path: `/rank/${item.id}`
            })
            this.setRankSongs(item)
        },
        handleList(playlist) {
            if(playlist.length>0){
                this.$refs.rank.style.bottom = '50px'
            }
        },
        ...mapMutations({
            setRankSongs: 'SET_RANK_SONGS'
        })
    }
}
</script>

<style lang="stylus">
    .rank
        position fixed
        top 140px
        bottom 0
        margin-top 15px        
        width 100%
        .rank-scroll
            position absolute
            overflow hidden 
            top 0            
            left 0
            right 0
            bottom 0  
            .rank-types          
                border 1px solid #666     
                // overflow hidden
                // width 100%
                height 100px
                // padding 10px
                margin 15px
                display flex
                .left-img        
                    flex-shrink 0
                    overflow hidden        
                    height 100px 
                    width 100px                    
                    background #999   
                    img 
                        height 100%             
                .right-content
                    flex:1                    
                    height 100px                    
                    background #555
                    display flex
                    flex-direction column
                    justify-content center
                    align-items left
                    p.rank-songs 
                        width 220px                        
                        white-space nowrap
                        overflow: hidden
                        text-overflow ellipsis
                        text-align left                       
                        margin 3px 10px 3px 15px
                        // border 1px solid yellow
                        color #eee
                        

</style>
