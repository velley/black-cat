import{getVKey,getLyric} from '@/api/song.js'
import { getUid } from 'common/js/uid'
import {Base64} from 'js-base64'
export class Singer {
    constructor ({id,name}) {
        this.id = id,
        this.name = name,
        this.imgUrl = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
    }
}

let urlMap = {}

export class Song {
    constructor ({id,mid,singer,name,album,duration,image,url}){
        this.id = id,
        this.mid = mid,
        this.singer = singer,
        this.name = name,
        this.album = album,
        this.duration = duration,
        this.image = image
        this.filename = `C400${this.mid}.m4a`
        // this.url = url
        if(urlMap[this.id]){
            this.url = urlMap[this.id]
        }else{
            this._genUrl()
        }
        
    }
    _genUrl() {
        
        getVKey(this.mid, this.filename).then((res) => {
          if (res.code === 0) {
            //   alert(11)
            const vkey = res.data.items[0].vkey
            this.url = `http://dl.stream.qqmusic.qq.com/${this.filename}?vkey=${vkey}&guid=${getUid()}&uin=0&fromtag=66`
            urlMap[this.id] = this.url
          }
        })
    }
    _getLyric() {
        console.log(0)
        if(this.lyric){
            return Promise.resolve(this.lyric)
        }
        return new Promise((resolve,reject)=>{
            getLyric(this.mid).then((res)=>{
                if(res.retcode === 0){
                    this.lyric = Base64.decode(res.lyric)
                    resolve(this.lyric)
                }else {
                    reject('未找到歌词')
                }                
                // console.log('the lyric is')
                // console.log(this.lyric)                
            })
        })        
    }
}
export function createSong(musicData) {
    return new Song({
        id          :   musicData.songid,
        mid         :   musicData.songmid,
        singer      :   filterSinger(musicData.singer),
        name        :   musicData.songname,
        album       :   musicData.albumname,
        duration    :   musicData.interval,
        image       :   `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        // url         :   `https://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=38`
    })
}
export function filterSinger(singers){
    let s = [];
    if(!singers){
        return ''
    }
    singers.forEach((item)=>{
        s.push(item.name)
    })
    return s.join('/')
}



