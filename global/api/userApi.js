import {post,get,deletes,put} from '../../global/fetch.js';
import { type } from 'os';

// 用户模块接口列表 用户类型接口在这里处理

// 获取所有用户接口
const getUserList=(params)=>{
    return get('/user',params)    
}

// 修改用户状态接口
const changeStatus=(type,id,status)=>{
    return put('/user/changeStatus?id='+id+'&type='+type+'&status='+status);
}

// 获取所有的角色信息
const getRole=(params)=>{
    return get('/role',params)
}

// 获取所有的角色信息
const updateAdminInfo=(params)=>{
    return put('/user/updateAdminInfo',params)
}

// 获取所有的责任人信息
const getChager=()=>{
    return get('/user/normalUserList')
}

export{getUserList,changeStatus,getRole,updateAdminInfo,getChager}