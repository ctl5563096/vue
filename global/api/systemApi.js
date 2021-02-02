import {post,get,deletes,put} from '../../global/fetch.js';
import { type } from 'os';

// 系统接口类

// 获取所有用户接口
const getParameterList=(page,pageSize,keywords,is_enabled)=>{
    return get('/getParameterList?page=' + page + '&pageSize=' + pageSize + '&keywords=' + keywords + '&is_enabled=' + is_enabled)    
}

// 系统初始化时获取全部的系统参数
const getParameterInitList=()=>{
    return get('/getParameterInit')    
}

// 获取参数详情
const getParameterDetail=(id)=>{
    return get('/getParameterDetail?id=' + id)
}
export{getParameterList,getParameterInitList,getParameterDetail}