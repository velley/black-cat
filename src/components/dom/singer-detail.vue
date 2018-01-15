<template>        
    <music-list :songs="songs" :title="title" :bg-img="bgImg">

    </music-list>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getSingerDetail} from 'api/singer'
    import {createSong} from 'common/js/class'
    import musicList from 'components/util/music-list'
    export default {
        data() {
            return {
                songs:[],
            }
        },
        components:{
            musicList
        },
        computed: {
            ...mapGetters([
                'singer'
            ]),
            title() {
                return this.singer.name
            },
            bgImg() {
                return this.singer.imgUrl
            }
        },
        created() {
            this.getDesc()
            console.log(this.singer)
        },
        methods: {
            getDesc() {
                console.log('id is' + this.singer.id)
                if(!this.singer.id){
                    this.$router.push('/singer');
                    return;
                }
                getSingerDetail(this.singer.id).then((res)=>{
                    if(res.code === 0){                        
                        this.songs = this.filterData(res.data.list)
                        console.log(res.data.list)
                    }
                })
            },
            filterData(list){
                let ret = [];
                list.forEach((item)=>{
                    let {musicData} = item
                    ret.push(createSong(musicData))
                })
                return ret;
            }
        }
    }
</script>

<style lang="stylus">
    
    
</style>

