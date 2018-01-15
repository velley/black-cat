<template>
    <div class="song-list">
        <div class="loading" v-if="!songs.length">
        </div>        
        <ul>
            <li @click="selectItem(item,key)" :key="key" v-for="(item,key) in songs" class="song-item">
                <div class="playing-icon" v-if="key===playingIndex">
                    
                </div>
                <div class="rank-index" v-if="rank" >
                    <span :class="getCls(key)">{{getText(key)}}</span>
                </div>
                <div class="content">
                    <h2 class="song-name">{{item.name}}</h2>
                    <p class="desc">{{item.singer}} - {{item.album}}</p>
                </div>
            </li>
        </ul>        
    </div>
</template>

<script>

export default {
    props: {
        songs: {
            type: Array,
            default: []
        },
        playingIndex: {
            type: Number,
            default: -1
        },
        rank: {
            type:Boolean,
            default:false
        }
    },
    components:{
        
    },
    methods: {
        selectItem(item,key) {
            this.$emit('select',item,key)
        },
        getCls(index) {
            if(index <=2){
                return `fa fa-2x fa-trophy icon${index}`
            }else{
                return `rank-index-else`
            }
        },
        getText(index) {
            if(index>2){
                return index + 1
            }
            
        }
    }
}
</script>

<style lang="stylus">
    .song-list
        margin 10px
        text-align left
        .song-item            
            // margin 3px
            // height 50px        
            // border-bottom 1px solid #222
            .content
                padding 8px 0                
                border-bottom 1px solid #222
                .song-name
                    font-size 0.8rem
                    color #ccc
                    font-family '微软雅黑'
                .desc
                    margin-top 5px
                    white-space nowrap
                    overflow: hidden
                    text-overflow ellipsis
            .playing-icon
                float left 
                border-left 3px solid #999                               
                height 36px                
                transform translate(0,11px)
                & ~ .content
                    padding-left 15px
            .rank-index
                float left
                height 36px
                line-height 36px
                width 30px
                text-align center                
                transform translate(0,12px)
                .fa.icon0
                    color yellow
                .fa.icon1
                    color #eee
                .fa.icon2
                    color #CDBA96  
                .rank-index-else
                    font-size 1.1rem
                    font-weight bold
                    color #C1CDCD
                & ~ .content
                    padding-left 40px

</style>

