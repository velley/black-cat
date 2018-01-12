<template>
    <div id="slider-box" ref="slider">
        <div id="slider-group" ref="sliderGroup">
            <slot></slot>            
        </div> 
        <ul class="dots">
            <li :key="key" v-for="(item,key) in dots" :class="{active:currentIndex===key}"></li>
        </ul>       
    </div>
</template>

<script>
import BSC from 'better-scroll'
export default {
  props:{
      loop: {
          type:Boolean,
          default:true
      },
      autoPlay: {
          type:Boolean,
          default:true
      },
      time: {
          type: Number,
          default: 2000
      }
  },
  data() {
      return {
          dots:[],
          currentIndex: 0
      }
  },
  mounted(){
      setTimeout(()=>{
          this.setGrouWidth();
          this.initDots();
          this.sliderRun();
          if(this.autoPlay){
              this.autoWork();
          }
      },20)
      window.onresize = ()=>{
          clearTimeout(this.resTimer);
          this.resTimer = setTimeout(
              ()=>{
                let isResize = true;
                this.setGrouWidth(isResize);
              },30
          )
          
        //   this.sliderRun();
      }
  },
  created() {
      
  },
  methods: {
    //   根据传入图片数量决定滑动容器的宽度
      setGrouWidth(isResize){          
          let sliderWidth = this.$refs.slider.clientWidth;          
          console.log('screen'+sliderWidth);
          
          this.children = this.$refs.sliderGroup.children;
          let len = this.children.length;
          let width = null;
          console.log(this.children);
          
          for(let i=0;i<len;i++){    
             let child = this.children[i];
             child.style.width = sliderWidth + 'px';  
                         
          }    
          if(this.loop && !isResize){
              width = sliderWidth*(len+2)
          }else{
              width = sliderWidth*len
          }
          this.$refs.sliderGroup.style.width = width + 'px';        
      },
      initDots(){
          console.log('长度为'+this.children.length);
          this.dots = new Array(this.children.length);
      },
      sliderRun(){
          this.slider = new BSC(this.$refs.slider,{
              scrollX:true,
              scrollY:false,
              momentum: false,
              snap: {
                loop: this.loop,
                threshold: 0.3,
                speed: 400
              }
          })
          this.slider.on('scrollEnd',this.onscrollEnd)
      },
      onscrollEnd(){          
            let pageIndex = this.slider.getCurrentPage().pageX;
            if(this.loop){
                pageIndex -= 1;
            }
            this.currentIndex = pageIndex; 
            if(this.loop){
                this.autoWork(); 
            }
                    
      },      
      autoWork(){
          let pageIndex = this.slider.getCurrentPage().pageX + 1;
          clearTimeout(this.timer);
          this.timer = setTimeout(
              ()=>{                  
                  this.slider.goToPage(pageIndex,0,400);
              },
              this.time
          )
          
      }
  },
  destroyed() {
      clearTimeout(this.timer)
  }
}
</script>

<style lang="stylus">
#slider-box
    width 100%        
    overflow hidden    
    #slider-group
        overflow hidden
    .dots
        margin 0 auto        
        overflow hidden
        position relative
        top -25px
        left -10px
        opacity 0.7
        li
            width 10px
            height 10px
            background #fff
            border-radius 50% 
            display inline-block
            margin 0 5px
            &.active
                width 24px
                border-radius 8px 
            
</style>

