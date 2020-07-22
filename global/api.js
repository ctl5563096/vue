import {post,get,deletes,put} from '../global/fetch.js';

// 接口列表 

// 测试接口
const getHome=()=>{
    return post('/home')    
}

// 获取管理员信息
const getUserInfo=(id)=>{
    return get('/user/getUserInfo?id=' + id)    
}

// 更新管理员信息
const updateUserInfo=(params)=>{
    return put('/user/updateUserInfo',params)
}

export{getHome,getUserInfo,updateUserInfo}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             