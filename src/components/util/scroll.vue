<template>
    <div ref="scrollBox" class="scroll-wrap">
        <slot></slot>
    </div>
</template>

<script>
import BSC from 'better-scroll'
export default {
    props: {
        probeType:{
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: []
        },
        listenScroll:{
            type: Boolean,
            default: false
        }
    },
    methods: {
        startScroll() {
            if(!this.$refs.scrollBox){
                return;
            }          
            
            this.scroll = new BSC(this.$refs.scrollBox,{
                probeType: this.probeType, 
                click: this.click
            })

            if(this.listenScroll){
                let _this = this;
                this.scroll.on('scroll',(pos)=>{
                    _this.$emit('scroll',pos)
                })
            }
        },
        enable() {
            this.scroll && this.scroll.enable();
        },
        disaable() {
            this.scroll && this.scroll.disable();
        },
        refresh() {
            this.scroll && this.scroll.refresh();
        },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
        }
    },
    mounted() {
        this.$nextTick(()=>{
            setTimeout(() => {
                this.startScroll();
            }, 20);
        })
        
    },
    watch: {
        // data(newdata){
        //     setTimeout(() => {
        //         console.log('数据更改')
        //         console.log(newdata)
        //         this.refresh()
        //     }, 25);
        // }
    }
}

</script>
<style lang="stylus">
    
</style>

