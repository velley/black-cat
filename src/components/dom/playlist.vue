<template>
<transition name="listmove">
    <div class="play-list">
        <scroll class="scroll-wrap" :data="songs"  :probe-type="probetype" >
            <song-list :songs="songs" :playingIndex="playingIndex" class="song-list" @select="goToPlay"></song-list>
        </scroll>
    </div>
</transition>
</template>

<script>
import songList from 'components/util/song-list'
import scroll from 'components/util/scroll'
export default {
    props:{
        songs:{
            type: Array,
            default: []
        },
        playingIndex:{
            type:Number,
            default:-1
        }
    },
    components:{
        songList,
        scroll
    },
    created() {
        this.probetype = 1;        
    },
    methods: {
        goToPlay(song,index) {
            this.$emit('playNewSong',index)
        }
    }
}
</script>



<style lang="stylus">
    .play-list        
        position fixed
        top 50%
        bottom 0
        left 0
        right 0
        background #333
        box-shadow 1px 1px 10px #222
        opacity 0.9
        .scroll-wrap                        
            width 100%
            overflow hidden
            // border 1px solid red
            position absolute
            top 0
            bottom 0px
            .song-list    
                // font-size 0.3rem          
                transform scale(0.8)
            
    

    .listmove-enter-active, .listmove-leave-active
        transition all 0.5s
    .listmove-enter,.listmove-leave-to
        transform translate3d(0,600px,0)
        
</style>
