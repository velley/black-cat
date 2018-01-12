import jsonp from '@/common/js/jsonp.js'
import {commonParams,options} from './param.js'
import {getUid} from '@/common/js/uid.js'
import axios from 'axios'
export function getVKey(songmid, filename) {
    const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  
    const data = Object.assign({}, commonParams, {
      cid: 205361747,
      format: 'json',
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0,
      uin: 0,
      songmid,
      filename,
      guid: getUid()
    })
  
    return jsonp(url, data, Object.assign({}, options, {
      param: 'callback'
    }))
}
export function getLyric(mid){
  const url = '/api/lyric'
  const data = Object.assign({},commonParams,{
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin:0,
    needNewCode:0,
    g_tk:67232076,
    format:'json'
  })
  return axios.get(url,{
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}