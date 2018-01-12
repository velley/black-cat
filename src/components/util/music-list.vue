<template>
    <div id="music-list">
        <router-link class="back" to="/singer" tag="div">
            <i class="fa fa-2x fa-arrow-left" ></i>
        </router-link>        
        <div class="bg-img" ref="bgImg">
            <h2 class="title">{{title}}</h2>
            <img :src="bgImg" alt="">
        </div>
        <div class="bg-layer" ref="layer"></div>
        <scroll :data="songs" class="scroll-wrap" @scroll="scroll" :listen-scroll="listenscroll" :probe-type="probetype">            
            <song-list :songs="songs" @select="selectSong"></song-list>                       
        </scroll>
    </div>
</template>

<script>
import songList from 'components/util/song-list'
import scroll from 'components/util/scroll'
import {mapActions} from 'vuex'
export default {
    props: {
        title:{
            type: String,
            default:''
        },
        bgImg:{
            type: String,
            default:''
        },
        songs:{
            type: Array,
            default:[]
        }
    },
    data() {
        return {
            scrollY: 0
        }
    },
    components:{
        songList,
        scroll
    },
    mounted() {
        
    },
    watch: {
        scrollY(newY){
            console.log(newY);
            let height = -document.body.clientHeight*0.4 + 30;
            console.log('the height is' + height)
            let psY = Math.max(height,newY);
            let zIndex = 0;
            let scale =1;
            let pesent = Math.abs(newY/height)
            this.$refs.layer.style['transform'] = `translate3d(0,${psY}px,0)`;
            if(newY>0){
                scale = 1 + pesent;
                zIndex = 10;
            }
            if(height>newY){
                zIndex = 1000;
                this.$refs.bgImg.style.height = '30px';   
                this.$refs.layer.style['transform'] = null;
                console.log('the height is 2 ' + height)             
            }else{                
                this.$refs.bgImg.style.height = '40%'; 
            }
            this.$refs.bgImg.style.zIndex = zIndex;
            this.$refs.bgImg.style['transform'] = `scale(${scale})`
            
        }
    },
    methods: {
        scroll(pos) {
            // console.log(pos.y);
            this.scrollY = pos.y
        },
        selectSong(item,key){
            var me = this;
            this.selectPlay({
                list: me.songs,
                index: key
            })
        },
        ...mapActions([
            'selectPlay'
        ])
    },
    created() {
        this.probetype = 3;
        this.listenscroll = true;
    }
}
</script>

<style lang="stylus">
    #music-list
        position fixed
        left 0
        right 0
        top 0
        bottom 0        
        background #333
        .back
            position absolute
            top 10px
            left 10px
            text-align left
            color #eee
            z-index 100        
        .bg-img
            position relative
            width 100%
            height 40%
            overflow hidden 
            .title
                position absolute
                width 100%
                text-align center
                color #ccc
                top 10px           
            img 
                width 100%
        .bg-layer
            position relative            
            height 100%
            background #333            
        .scroll-wrap                        
            width 100%
            // overflow hidden
            position absolute
            top 42%
            bottom 5px
            
</style>

