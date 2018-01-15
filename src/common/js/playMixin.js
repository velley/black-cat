import {mapGetters} from 'vuex'

export const playMixin = {
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    mounted(){
        this.handleList(this.playlist)
    },
    activated(){
        this.handleList(this.playlist)
    },
    methods: {
        handleList() {
            throw new Error('该组件必须添加执行方法handlelist')
        }   
    },
    watch:{
        playlist(newVal){
            this.handleList(newVal)
        }
    },

}