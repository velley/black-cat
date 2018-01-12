<template>
    <div class="p-circle">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="40" height="40" view-box="50 50 50 50">
            <circle class="circle-back" r="19" cx="20" cy="20" fill="transparent">
            </circle>
            <circle class="circle-bar" r="19" cx="20" cy="20" 
                    fill="transparent"
                    :stroke-dasharray="dashArray"
                    :stroke-dashoffset="dashOffset"
            ></circle>
            
        </svg>
        <slot></slot>
    </div>
</template>

<style lang="stylus">
    .p-circle
        position relative      
        circle
            stroke-width 2px
            transform-origin center  
            &.circle-back
                stroke #666 
            &.circle-bar                
                stroke #ccc                
                transform rotate(-90deg)
            
</style>

<script>
export default {
    props:{
        percent:{
            type: Number,
            default:0
        }
    },
    data(){
        return{
            dashArray:Math.PI*40,           

        }
    },
    computed: {
        dashOffset(){
            return (1-this.percent)*this.dashArray
        }
    }
}
</script>
