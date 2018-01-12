<template>
    <div class="song-list">
        <div class="loading" v-if="!songs.length">
        </div>        
        <ul>
            <li @click="selectItem(item,key)" :key="key" v-for="(item,key) in songs" class="song-item">
                <div class="playing-icon" v-if="key===playingIndex">
                    
                </div>
                <div class="content">
                    <h2 class="song-name">{{item.name}}</h2>
                    <p class="desc">{{item.singer}} - {{item.album}}</p>
                </div>
            </li>
        </ul>        
    </div>
</template>

<script>

export default {
    props: {
        songs: {
            type: Array,
            default: []
        },
        playingIndex: {
            type: Number,
            default: -1
        }
    },
    components:{
        
    },
    methods: {
        selectItem(item,key) {
            this.$emit('select',item,key)
        }
    }
}
</script>

<style lang="stylus">
    .song-list
        margin 10px
        text-align left
        .song-item            
            margin 3px        
            .content
                padding 6px 0
                border-bottom 1px solid #222
                .song-name
                    color #ccc
                    font-family '宋体'
                .desc
                    margin-top 5px
            .playing-icon
                float left 
                border-left 3px solid #666
                width 8px
                height 30px
                transform translate(0,10px)
</style>

