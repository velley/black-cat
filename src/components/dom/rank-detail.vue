<template>
    
    <music-list :title="title" :bg-img="bgImg" :rank="showRank" :songs="songs" >
    </music-list>
    
</template>

<script>
import musicList from 'components/util/music-list'
import {getRankSongList} from 'api/rank'
import {createSong} from 'common/js/class'
import {mapGetters} from 'vuex'
export default {    
    data(){
        return {
            songs:[],
            showRank:true
        }
    },
    created() {
        this.getsongs()
    },
    computed: {
        ...mapGetters([
            'rankSongs'
        ]),
        title(){            
            return this.rankSongs.topTitle
        },
        bgImg() {
            if(this.songs.length){
                return this.songs[0].image
            }
            return this.rankSongs.picUrl
        }
    },
    methods:{
        getsongs() {
            if(!this.rankSongs.id){
                this.$router.push({
                    path:'/rank'
                })
                return
            }
            getRankSongList(this.rankSongs.id).then((res)=>{
                if(res.code === 0){
                    this.songs = this.filterData(res.songlist)
                }
            })
        },
        filterData(list) {
            let ret = [];
            list.forEach((item)=>{
                let musicData = item.data
                ret.push(createSong(musicData))
            })
            return ret;
        }
    },
    components:{
        musicList
    }
}
</script>
