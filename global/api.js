import {post} from '../global/fetch.js';

// 接口列表 
const getHome=()=>{
    return post('/home')    
}

export{getHome}