import {post,get,deletes,put} from '../../global/fetch.js';
import { type } from 'os';

// 房屋模块接口列表

// 获取所有用户接口
const getHouseList=(params)=>{
    return get('/house',params)    
}

// 新增房屋接口
const addHouse=(params)=>{
    return post('/house',params)
}

// 获取房屋详情
const getHouseById=(id)=>{
    return get('/houseInfo?id=' + id)
}

// 修改房屋详情
const updateHouseInfo=(params)=>{
    return put('/house',params)
}
export{getHouseList,addHouse,getHouseById,updateHouseInfo}