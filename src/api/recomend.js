import jsonp from 'common/js/jsonp.js'
import {commonParams,options} from './param.js'
import axios from 'axios'

export function getRecomend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data = Object.assign({},commonParams,{
        platform: 'h5',
        uin :0,
        needNewCode:1
    })
    return jsonp(url,data,options)
}
export function getDiscList() {
    const url = '/api/getDiscList'
    const data = Object.assign({},commonParams,{
        platform: 'h5',
        uin :0,
        format:'json',
        needNewCode:1,
        categoryId: 10000000,
        ein:29,
        sortId:5,
        rnd: Math.random()
    })
    return axios.get(url,{
        params: data
    }).then((res)=>{        
        return Promise.resolve(res.data)
        alert(1)
       
    })
}
export function getDiscData(disstid) {
    // const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    const url = '/api/getCdInfo'
    const data = Object.assign({},commonParams,{
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,    
        needNewCode: 0,
        format:'jsonp'
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
    return Promise.resolve(res.data)
    })
}
