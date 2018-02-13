import * as types from './mutation-types'
import {playMode} from 'common/js/config'


function findIndex(list,song){
    console.log(song.id)
    return list.findIndex((item)=>{
        return item.id === song.id
    })
}
export const selectPlay = function ({commit,state},{list,index}){
    commit(types.SET_SEQUENCE_LIST,list)
    // if(state.mode===playMode.random){
    //     let randomList = list.shuffle()
    //     commit(types.SET_PLAYLIST,randomList)
    //     index = findIndex(randomList,list[index])
    // }else{
        commit(types.SET_PLAYLIST,list)
    // }
    
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_PLAYING_STATE,true)
    commit(types.SET_FULL_SCREEN,true)    
}

export const insertSong = function({commit,state},song){
    let playlist = state.playlist.slice()
    let currentIndex = state.currentIndex
    let currentSong = playlist[currentIndex]
    // 判断列表是否已存在该歌曲
    let newIndex = findIndex(playlist,song)    
    if(newIndex>-1){
        commit(types.SET_CURRENT_INDEX,newIndex)
    }else{
        currentIndex++
        playlist.splice(currentIndex,0,song)
        commit(types.SET_CURRENT_INDEX,currentIndex)
        commit(types.SET_PLAYLIST,playlist)
    }   
    commit(types.SET_PLAYING_STATE,true)
    commit(types.SET_FULL_SCREEN,true)  
}