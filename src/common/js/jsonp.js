import  originJSONP from 'jsonp'

export default (url,data,option)=>{
    url += (url.indexOf('?')<0 ? '?' : '&') + param(data);
    return new Promise((resolve,reject)=>{
        originJSONP(url,option,(err,data)=>{            
            if(!err){
                resolve(data)                
            }else{
                reject(err)  
            }
        })
    })
}
export function param(data){
    let res = '';
    for(let i in data){
        let value = data[i];
        res += '&' + i + '=' + encodeURIComponent(value);
    }
    return res ? res.substring(1) : ''
}