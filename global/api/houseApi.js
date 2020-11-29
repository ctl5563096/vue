import {post,get,deletes,put} from '../../global/fetch.js';
import { type } from 'os';

// 房屋模块接口列表

// 获取所有用户接口
const getHouseList=(params)=>{
    return get('/house',params)    
}

export{getHouseList}