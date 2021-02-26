import {post,get,deletes,put} from '../fetch.js';

// 租房类详细接口

// 获取房屋详情
const getHomeList=(id)=>{
    return get('/home?id=' + id)
}

export{getHomeList}