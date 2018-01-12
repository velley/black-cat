<template>
<div class="bar">
    <div class="c-time">{{currentTime}}</div>
    <div class="p-line" ref="pLine" @click="lineClick">
        <div class="c-bar" ref="cBar">

        </div>
        <button @touchstart.prevent="touchStart" 
                @touchmove.prevent="touchMove" 
                @touchend="touchEnd" ref="btn"
        ></button>
    </div>
    <div class="t-time">{{duration}}</div>
</div>    
</template>

<script>
export default {
    props: {
        currentTime:{
            type:String,
            default:'x'
        },
        duration: {
            type:String,
            default:'x'
        },
        percent: {
            type:Number,
            default:0
        }
    },
    created(){
        this.touch = {};
        this.pWidth = 0
    },
    watch: {
        percent(newcent) {
            if(this.touch.init){
                return
            }
            const pWidth = this.$refs.pLine.offsetWidth - this.$refs.btn.offsetWidth
            this.pWidth = pWidth
            // console.log(pWidth)
            const cWidth = Math.floor(pWidth*newcent)
            this.setWidth(cWidth)            
        }
    },
    methods: {
        setWidth(cWidth) {
            this.$refs.cBar.style.width = cWidth + 'px'
            this.$refs.btn.style.left = cWidth + 'px'
        },
        lineClick(e){
            const left = e.clientX
            const delta = left - this.$refs.pLine.offsetLeft
            const percent = delta/this.pWidth
            console.log(delta)
            this.setWidth(delta)
            this.changePercent(percent)
        },
        touchStart(e) {
            this.touch.init = true
            this.touch.startX = e.touches[0].pageX
            this.touch.startW = this.$refs.cBar.offsetWidth
        },
        touchMove(e) {
            if(!this.touch.init){
                return
            }
            this.touch.currentX = e.touches[0].pageX
            const diff = this.touch.currentX - this.touch.startX            
            const currentW = diff + this.touch.startW
            
            if(currentW<=0){
                return
            }else if(currentW>=this.pWidth){
                return
            }
            this.setWidth(currentW)
            
        },
        touchEnd(e) {
            this.touch.init = false
            this.touch.endX = e.changedTouches[0].pageX
            const diff = this.touch.endX - this.touch.startX
            const endW = diff + this.touch.startW            
            const newPercent = endW / this.pWidth
            this.changePercent(newPercent)
            
        },
        changePercent(newPercent) {
            this.$emit('pBarTouch',newPercent)
        }
    }
    
}
</script>

<style lang="stylus">
    .bar
        color #ddd
        width 100%
        position absolute
        bottom 100px
        display flex
        justify-content center
        align-items center
        .p-line
            position relative
            margin 0 10px
            width 250px
            height 4px
            background #111
            border-radius 2px
            border-bottom 1px solid #000
            // border-top 1px solid #333 
            .c-bar
                position absolute
                height 4px
                width 0px
                top 0
                left 0
                border-radius 2px 0 0 2px
                background #555
            button
                width 12px
                height 12px
                box-sizing border-box
                border-radius 50%
                background #666
                position absolute
                left 0
                top -4px
            
</style>
