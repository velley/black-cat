import jsonp from 'common/js/jsonp.js'
import {commonParams,options} from './param.js'
import axios from 'axios'

export function getSingers() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
    const data = Object.assign({},commonParams,{
        g_tk: 1988093487,    
        format:'jsonp',    
        page: 'list',
        pagesize: 100,
        channel:'singer',
        pagenum: 1,
        key: 'all_all_all',
        platform:'yqq',
        needNewCode:0
    })
    return jsonp(url,data,options)
}

export function getSingerDetail(singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    const data = Object.assign({},commonParams,{
        hostUin:0,
        utf8:1,
        r:1513950240757,
        singermid: singerId,
        platform: 'yqq',
        songstatus: 1,
        order: 'listen',
        g_tk: 1988093487,
        needNewCode:0,        
    })
    return jsonp(url,data,options)
}