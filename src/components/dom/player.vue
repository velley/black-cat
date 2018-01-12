<template>
    <div id="play-wrap" v-show="playlist.length>0" ref="wrap">
        <!-- 全屏播放器 -->
        <transition name="normal">
            <div class="normal-player" v-show="fullScreen" @click="proxyEvent">                
                <i class="fa fa-2x fa-arrow-left" @click="back"></i>  
                <div class="song-data">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="singer" v-html="currentSong.singer"></p>
                </div>                
                <div class="background" ref="background">
                    <img :src="currentSong.image" :class="CDplay" class="play" alt="">
                </div> 
                <div class="add-buttons">
                    <i class="love fa fa-heart"></i>
                    <i class="add fa fa-plus"></i>
                    <i class="song-menu fa fa-ellipsis-v"></i>
                </div>
                <!--进度条  -->
                <progress-bar   :currentTime="format(currentTime)" 
                                :duration="format(duration)" 
                                :percent="percent"
                                @pBarTouch="pBarTouch"                                
                ></progress-bar>
                <!-- 播放相关按钮 -->
                <div class="playbutton-box">
                    <i class="play-mode fa fa-2x " :class="iconMode" @click="changeMode"></i>
                    <i class="pre-song fa fa-2x fa-fast-backward" @click="prevSong"></i>
                    <i class="start-play fa fa-2x fa-pause" @click="togglePlay" ref="pButton"></i>
                    <i class="next-song fa fa-2x fa-fast-forward" @click="playEnd"></i>
                    <i class="love fa fa-2x fa-outdent" @click.stop="changeShowList"></i>
                </div>      
                <!--播放列表-  -->
                <play-list v-if="showList" :songs="playlist" :playingIndex="currentIndex" ref="playList" @playNewSong="playNewSong"></play-list>
            </div>
        </transition>

        <!-- 迷你播放器 -->
        <div class="mini-player" v-show="!fullScreen" @click="openFull">
            <progress-circle class="backcontainer" :percent="percent">
            <div class="background" ref="background">                
                <img :src="currentSong.image" class="b-img play" :class="CDplay" alt="">                
            </div> 
            </progress-circle >
            <div class="song-data">
                <h5 class="name" v-html="currentSong.name"></h5>
                <p class="singer" v-html="currentSong.singer"></p>
            </div>            
            <div class="playbutton-box">
                <i class="start-play fa fa-2x fa-play" @click.stop="togglePlay" ref="pButton"></i>
                <i class="next-song fa fa-2x fa-fast-forward" @click.stop="playEnd"></i>
                <i class="love fa fa-2x fa-heart"></i>
            </div> 
        </div>
        <!-- 多媒体地址 -->
        <audio :src="currentSong.url" @canplay="ready" @timeupdate="timeupdate" @ended="playEnd" ref="audio"></audio>
    </div>
</template>

<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'
import progressBar from './progress-bar'
import playList from './playlist'
import progressCircle from './progress-circle'
import {playMode} from 'common/js/config.js'
import Lyric from 'lyric-parser'
export default {
    data() {
        return {
            songReady:false,
            currentTime:0,
            showList:false,
            randomIndex:0
        }
    },
    components:{
        progressBar,
        progressCircle,
        playList
    },
    computed: {
        ...mapGetters([
            'fullScreen',
            'playlist',
            'playing',
            'currentSong',
            'currentIndex',
            'mode'
        ]), 
        CDplay() {
            return this.playing ? '' : 'pause'
        },
        duration() {
            return this.currentSong.duration
        },
        percent() {
            return this.currentTime / this.duration
        },
        iconMode() {
            return this.mode === playMode.sequence ? 'fa-bars' : this.mode === playMode.loop ? 'fa-exchange' : 'fa-random'
        }
    },
    mounted() {        
        const back = this.$refs.background;
        const backImg = require('@/assets/img/ground.jpg')
        // back.style.height = back.offsetWidth + 'px'
        // console.log('url is '+backImg)
        // this.$refs.wrap.style.background = `#999`

    },
    methods: {
        changeShowList() {            
            this.showList = !this.showList
        },
        proxyEvent(e){   
            if(this.showList){
                this.changeShowList()
            }
        },
        back() {
            this.setFullScreen(false)
        },
        openFull() {
            this.setFullScreen(true)
        },
        togglePlay() {
            if(!this.songReady){
                return
            }
            this.setPlaying(!this.playing)                        
        },
        ready() {
            this.songReady = true
        },
        prevSong() {
            if(!this.songReady){
                return
            }
            let index = this.currentIndex -1
            if(index===-1){
                index = this.playlist.length - 1
            }
            this.setCurrentIndex(index)
            if(!this.playing){
                this.togglePlay()
            }
            this.songReady = false
        },
        nextSong() {
            if(!this.songReady){
                return
            }
            let index = this.currentIndex + 1
            if(index>=this.playlist.length){
                index = 0
            }
            console.log(index)
            this.setCurrentIndex(index)
            if(!this.playing){
                this.togglePlay()
            }
            this.songReady = false
        },
        randomSong() {
            if(!this.songReady){
                return
            }
            let len = this.playlist.length - 1
            let oldNum = this.randomIndex
            do{
                this.randomIndex = Math.getRandom(0,len)
            }while(this.randomIndex===oldNum)            
            console.log(this.randomIndex)
            this.playNewSong(this.randomIndex)
            if(!this.playing){
                this.togglePlay()
            }
            this.songReady = false
        },
        timeupdate(e) {
            this.currentTime = e.target.currentTime
        },
        format(time) {
            time = time | 0
            const minute = time / 60 | 0
            const second = this.pad(time%60)
            return `${minute}:${second}`
        },
        pad(num,n=2) {
            let len = num.toString().length
            while(len<n){
                num = '0' + num;
                len ++
            }
            return num
        },
        pBarTouch(newPercent) { 
            this.$refs.audio.currentTime = Math.floor(this.duration*newPercent)
            if(!this.playing){
                this.togglePlay()
            }
        },
        playEnd() {
            if(this.mode === playMode.sequence){
                this.nextSong()
            }else if(this.mode === playMode.random){
                this.randomSong()
            }else {
                this.$refs.audio.currentTime = 0
                this.$refs.audio.play()
                if(!this.playing){
                    this.togglePlay()
                }
            }            
        },        
        playNewSong(index) {
            this.setCurrentIndex(index)
            if(!this.playing){
                this.togglePlay()
            }
        },
        changeMode(){
            const mode = this.mode === 0 ? 1 : this.mode === 1 ? 2 : 0 
            this.setPlayMode(mode)
            // if(mode === playMode.random){
                
            //     const list = this.playlist            
            //     const index = this.currentIndex  
            //     this.selectPlay({list,index})  

            //     // this.randomList = oldList.shuffle()
            //     // const newIndex = this.randomList.findIndex((item)=>{
            //     //     return item.id = oldList[oldIndex].id
            //     // })
            //     // this.setPlayList(this.randomList)
            //     // this.setCurrentIndex(newIndex)
            // }
        },
        getLyric() {
            this.currentSong._getLyric().then((lyric)=>{
                this.currentLyric = new Lyric(lyric)
                console.log('当前歌词为')
                console.log(this.currentLyric)
            })
        },
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlaying: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAYLIST',
        }),
        ...mapActions([
            'selectPlay'
        ])
        
    },
    watch: {
        currentSong(newSong) {
            console.log(this.currentSong.url)
            this.$nextTick(()=>{
                this.getLyric()
                this.$refs.audio.play()
            })
            
        },
        playing(newplay) {
            const audio = this.$refs.audio
            const playButtons = getDom('.start-play');

            this.$nextTick(()=>{
                newplay ? audio.play() : audio.pause()                
            })
            
            for(let i=0;i<2;i++){
                let item = playButtons[i];
                if(this.playing){
                    item.removeClass('fa-play')
                    item.addClass('fa-pause')
                }else{
                    item.addClass('fa-play')
                    item.removeClass('fa-pause')
                }
            }      

        }
    }
}
</script>

<style lang="stylus">
    #play-wrap
        z-index 1000
        .normal-enter-active, .normal-leave-active
            transition all 0.5s
            .playbutton-box, .song-data
                transition all 0.5s

        .normal-enter, .normal-leave-to
            opacity: 0            
            .playbutton-box
                transform translate3d(0,100px,0)
            .song-data
                transform translate3d(0,-100px,0)
        .normal-player
            top 0
            left 0
            right 0
            bottom 0
            position fixed    
            background #333
            background-image url('../../assets/img/ground.jpg') 
            background-position center
            color #999
            .fa-arrow-left
                position absolute
                left 10px
                top 10px
            .song-data
                width 100%
                text-align center
                margin-top 50px
                h2
                    margin 5px 0
                    color #ccc
            .background
                background #666
                border 10px solid #666
                box-shadow 2px 2px 5px #333
                width 300px
                height 300px
                border-radius 50%
                position absolute
                top 120px
                left 50%
                transform translate(-50%,0)
                overflow hidden
                img 
                    width 100%
                    &.play
                        animation: rotate 10s linear infinite
                    &.pause
                        animation-play-state: paused  
            .add-buttons
                width 100%
                text-align center
                transform scale(1.5)
                position absolute
                top 460px
                i 
                    margin 10px                     
            .playbutton-box
                height 50px
                width 100%
                position absolute
                bottom 10px                
                text-align center
                i
                    margin 0 12px
        .mini-player
            background #333
            box-shadow 1px 1px 12px #222
            height 40px
            padding 5px 10px            
            width 100%
            position fixed
            bottom 0px          
            .backcontainer                
                float left
                width 40px
                height 40px  
                border-radius 50%
                .background
                    position absolute
                    top 0
                    left 0
                    overflow hidden
                    width 40px
                    height 40px  
                    border-radius 50%                    
                    transform scale(0.9)
                    img
                        // display none
                        width 100%  
                        &.play
                            animation: rotate 10s linear infinite
                        &.pause
                            animation-play-state: paused                      
                                            
            .song-data
                text-align left
                width 120px
                line-height 20px
                margin-left 50px
                top 0
            .playbutton-box
                position absolute
                top 15px
                right 60px
                i
                    margin 0 6px
    @keyframes rotate
        0%
            transform: rotate(0)
        100%
            transform: rotate(360deg)
                
            
</style>
