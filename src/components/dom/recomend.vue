<template>
<div id="recomend">
  <slider ref="slider" v-if="sliders.length">
    <div class="img-box" :key="key" v-for="(item,key) in sliders">
      <a :href="item.linkUrl">
        <img :src="item.picUrl" alt="">
      </a>      
    </div>
  </slider>

  <div class="disc-list-box">
    <h3>热门歌单</h3>
    <div class="loading" v-show="!discList.length">        
    </div>
    <scroll :data="discList" v-if="discList.length" class="scroll-box">
      
      <ul class="disc-list">
        <li :key=key v-for="(item,key) in discList" class="disc-item" >
          <div class="disc-img">
            <img v-lazy="item.imgurl" alt="" :ref="key">
          </div>        
          <div class="right-content">
            <h5>{{item.creator.name}}</h5>
            <p>{{item.dissname}}</p>
          </div>        
        </li>
      </ul>
      
    </scroll>
    
  </div> 
</div>
</template>

<script>
import {getRecomend,getDiscList} from 'api/recomend.js'
import slider from 'components/util/slider'
import scroll from 'components/util/scroll'
export default {  
  data () {
    return {
      sliders:[],
      discList:[],
      runtime:1000
    }
  },
  components:{
    slider,
    scroll
  },
  created(){
    this._getRecomend();
    this._getDiscList();
  },
  
  methods: {
    _getRecomend(){
      getRecomend().then((res)=>{        
        if(res.code===0){          
          this.sliders = res.data.slider;
          console.log(this.sliders[0].linkUrl);        
        }
      })
    },
    _getDiscList(){      
      getDiscList().then((res)=>{
        
        if(res.code===0){
          this.discList = res.data.list;          
          console.log(this.discList);
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
#recomend
  margin-top 10px  
  width 100%    
  .img-box
    display inline-block
    overflow hidden
    width 100%
    float left
    img 
      width 100%
  
  .disc-list-box
    padding 0 5px
    position fixed 
    top 50%
    width 100%    
    bottom 10px    
    h3
      margin-bottom 10px      
      font-size 1.6em
      font-family '微软雅黑'
    .scroll-box
      height 95%       
      width 96%       
      // bottom 5px
      // border 1px solid yellow
      overflow hidden
      .disc-list
        display flex
        flex-direction column
        .disc-item
          overflow hidden
          height 60px
          margin 8px 0
          display flex
          flex-direction row
          justify-content flex-start
          .disc-img 
            img 
              width 60px
          .right-content
            flex 1
            text-align left          
            padding 5px 10px
            h5
              color #ddd
              height 25px
              line-height 25px
              font-size 1.5em
            p
              font-size 1.3em
        
      
</style>
