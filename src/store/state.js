import {playMode} from 'common/js/config'
import { currentIndex } from './getters';

const state = {
    singer: {},
    playing: false,
    fullScreen:false,
    playlist:[],
    sequenceList:[],
    mode: playMode.sequence,
    currentIndex: -1
    
}
export default state