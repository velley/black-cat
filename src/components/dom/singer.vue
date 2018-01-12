<template>
    <div class="singer-wrap">   
        <scroll :data="singers" 
                :listenScroll="listenScroll" 
                :probeType = "probeType"
                class="scroll-wrap" 
                ref="scrollWrap" 
                @scroll = "scroll"
        >     
            <div @touchmove="onContentTouchMove">
                <div class="singer-group" :key="key" v-for="(group,key) in singers" ref="group">
                    <h5>{{group.title}}</h5>
                    <ul class="group-box">
                        <li :key="i" v-for="(singer,i) in group.items" class="group-item"  @click="getDetail(singer)">
                            <img v-lazy="singer.imgUrl" alt="">
                            <p class="singer-name">{{singer.name}}</p>
                        </li>
                    </ul>
                </div>                
            </div> 
            <ul class="short-index" @touchstart="onShortTouchStart" @touchmove.stop.prevent="onShortTouchMove">
                <li :key="item" v-for="(item,index) in shortIndex" :data-index="index" class="i-item" :class="{'light':index===0}" ref="anItem">
                    {{item}}
                </li>
            </ul> 
            <h2 class="fixed-title" v-if="currentTitle" ref="fixed">{{currentTitle}}</h2>           
        </scroll>   
        <router-view></router-view>    
    </div>
 
</template>

<script>
import scroll from 'components/util/scroll'
import {getSingers} from 'api/singer.js'
import {Singer} from 'common/js/class.js'
import {mapMutations} from 'vuex'


const HotLength = 10
const HotName = '热门'
const indexHeight = 18
const TITLEHEIGHT = 20
export default {    
    data() {
        return{
            singers:[],
            scrollY: -1,
            diff:0,
            onIndex: 0
        }
    },
    computed: {
        shortIndex() {
            return this.singers.map((group)=>{
                return group.title.substr(0,1)
            })
        },
        currentTitle() {
            if(this.scrollY > 0){
                return '';
            }
            return this.singers[this.onIndex] ? this.singers[this.onIndex].title : '';
        }        
    },
    components: {
        scroll,
    },
    created() {
        this.listenScroll = true;
        this.probeType = 3;
        this._getSingers();
        this.touch = {};
    },
    watch: {
        singers() {
            setTimeout(() => {
                this.getHeight();
            }, 20);
        },
        scrollY(newY){
            const listHeight = this.listHeight;
            for(let i=0;i<listHeight.length;i++){
                let h1 = listHeight[i];
                let h2 = listHeight[i+1];
                if(!h2 || (-newY > h1 && -newY < h2)){
                    this.onIndex = i;     
                    this.diff = h2 + newY;
                    this.$refs.anItem[i].addOnlyClass('light');               
                    return;
                }else if(i===0 && -newY < h1){
                    return;
                }                           
            }
        },
        diff(newD){
            let fixedTop = (newD>0 && newD<TITLEHEIGHT) ? newD - TITLEHEIGHT : 0;
            if(this.fixedTop === fixedTop){
                return;
            }
            this.fixedTop = fixedTop;
            console.log('newD is ' +newD)
            console.log('fixed is ' +fixedTop)
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
        }
    },
    methods: {
        scroll(pos){
            this.scrollY = pos.y
            // console.log(pos.y);
        },
        getHeight(){
            this.listHeight = [];
            const list = this.$refs.group;
            let height = 0;
            this.listHeight.push(height);
            for(let i=0;i<list.length;i++){
                let item = list[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }

        },
        _getSingers() {            
            getSingers().then((res)=>{                
                if(res.code===0){
                    this.singers = this.filter(res.data.list);                    
                }
            })
        },
        filter(list) {
            let map = {
                hot:{
                    title: HotName,
                    items:[]
                }
            }
            list.forEach((item,index)=>{
                if(index < HotLength){
                    map.hot.items.push(new Singer({
                        name:item.Fsinger_name,
                        id: item.Fsinger_mid
                    }))
                }
                let key = item.Findex
                if(!map[key]){
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                map[key].items.push(new Singer({
                    name:item.Fsinger_name,
                    id: item.Fsinger_mid
                }))
            })
            let ret = [],
                hot = [];
            for(let i in map){
                let data = map[i];
                if((/[a-zA-Z]/).test(data.title)){
                    ret.push(data)
                }else if(data.title === HotName){
                    hot.push(data)
                }
            }
            ret.sort((a,b)=>{
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            }) 
            console.log(hot.concat(ret))
            return hot.concat(ret)
        },
        onShortTouchStart(e){            
            console.log(e.target);
            let el = e.target;
            if(!el.hasClass('i-item')){
                return;
            }
            let onIndex = el.data('index');
            let startPoint = e.touches[0];
            this.touch.start = startPoint.pageY;
            this.touch.startIndex = onIndex;
            console.log(onIndex)            
            // 将被点击的索引字母高亮            
            el.addOnlyClass('light');
            // 定位
            this.scrollTo(onIndex);
            this.onIndex = onIndex;
        },
        onShortTouchMove(e) {
            let curPoint = e.touches[0];            
            this.touch.end = curPoint.pageY;
            let numY = Math.floor((this.touch.end - this.touch.start)/indexHeight);            
            let onIndex = parseInt(this.touch.startIndex) + numY;  
            if(!this.$refs.anItem[onIndex]){
                console.log('滑动范围超过索引');
                return;
            }   
            this.onIndex = onIndex;
            this.$refs.anItem[onIndex].addOnlyClass('light');
            // 定位
            this.scrollTo(onIndex);
        },
        scrollTo(index) {
            this.$refs.scrollWrap.scrollToElement(this.$refs.group[index])
        },
        onContentTouchMove() {
            // console.log(0);
            let groups = this.$refs.group;
            console.log(groups[0].offsetTop)
            // groups.forEach((item,index)=>{
            //     if(item.offsetTop<=500 && item.offsetTop>=100){
            //         console.log(index)
            //     }
            // })
        },     
        getDetail(singer) {
            this.$router.push({
                path:`/singer/${singer.id}`
            })
            this.setSinger(singer)
            // alert(singer.id)
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        }) 

    }
}
</script>

<style scoped lang="stylus">
    .singer-wrap        
        .scroll-wrap
            position fixed
            overflow hidden
            width 100%
            top 140px
            bottom 0
            margin-top 15px
            // border 1px solid yellow
            .fixed-title
                width 100%
                position absolute
                top:0px
                background #666
                text-align left
                padding-left 10px
                font-size 1.3em
                height 20px
                line-height 20px
                color #ccc
            .singer-group
                h5  
                    width 100%
                    background #666
                    text-align left
                    padding-left 10px
                    font-size 1.3em
                    height 20px
                    line-height 20px
                    color #ccc
                .group-box                
                    .group-item
                        text-align left 
                        overflow hidden
                        padding 10px 10px
                        height 60px
                        display flex
                        align-items center
                        img 
                            height 100%
                            border-radius 50%                        
                        .singer-name            
                            font-size 1.4em   
                            font-family '黑体'         
                            margin-left 10px
        .short-index
            position fixed
            background #444
            padding 3px
            border-radius 10px
            right 5px
            top 180px            
            li
                margin 2px 0
                font-family 'arial'
                color #ccc
                height 15px                
                &.light
                    color yellow
                        
</style>
