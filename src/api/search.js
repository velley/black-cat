import jsonp from 'common/js/jsonp.js'
import {commonParams,options} from './param.js'

export function getHotKey() {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
    const data = Object.assign({},commonParams,{
        platform: 'h5',
        format:'jsonp',
        g_tk: 1928093487

    })
    return jsonp(url,data,options)
}
export function searchResult(query,page,zhida,perpage) {
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
    const data = Object.assign({},commonParams,{
        w:query,
        p:page,
        catZhida: zhida ? 1 : 0,
        t:0,
        sem:1,
        aggr:0,
        perpage,
        n:perpage,        
        remoteplace: 'txt.mqq.all',
        uid:0,
        format:'jsonp'
    })
    return jsonp(url,data,options)
}