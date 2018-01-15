<template>              
    <music-list :title="title" :bgImg="bgimg" :songs="songs"></music-list>    
</template>

<script>
import {mapGetters} from 'vuex'
import {getDiscData} from 'api/recomend'
import {createSong} from 'common/js/class'
import musicList from 'components/util/music-list'
export default {
    prop:{

    },
    data() {
        return{
            songs:[
                
            ]
        }
    },
    computed:{
        ...mapGetters([
            'disc'
        ]),
        title() {
            return this.disc.dissname
        },
        bgimg() {
            return this.disc.imgurl
        }
    },
    components:{
        musicList,
    },
    created(){
        if(!this.disc.dissid){
            this.$router.back()
            return
        }
        let me = this
        getDiscData(this.disc.dissid).then((res)=>{
            console.log(res)
            if(res.code===0){                
                me.songs = me.filterData(res.cdlist[0].songlist)
            }
        })
    },
    methods:{
        filterData(list){
            let ret = []
            list.forEach((item)=>{
                ret.push(createSong(item))
            })
            return ret
        }
    }
}
</script>

<style lang="stylus">
    .disc-detail
        position fixed
        top 0
        bottom 0
        width 100%
        background #333        
</style>
