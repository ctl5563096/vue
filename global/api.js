import {post} from '../global/fetch.js';

const getHome=()=>{
    return post('/home')    
}
export{getHome}