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

// 获权限菜单
const getMenuById=(id)=>{
    return get('/menu?id='+id)
}

// 根据角色ID获取权限
const getRuleByRole=(id)=>{
    return get('/ruleById?id='+id)
}

// 获取所有的角色信息
const getRole=(params)=>{
    return get('/role',params)
}

// 获取所有权限信息
const getRuleBack=(params)=>{
    return get('/rule')
}

// 修改角色权限
const changeRoleRule=(params)=>{
    return put('/rule',params)
}

// 删除权限
const delRule=(id)=>{
    return deletes('/rule?id=' + id);
}

// 增加权限
const addRule=(params)=>{
    return post('/rule',params);
}

// 获取单个权限详情
const getRuleDetail=(id)=>{
    return get('/ruleDetail?id='+id);
}

// 修改单个权限详情
const editRule=(params)=>{
    return put('/editRule',params);
}

// 轮播图列表
const getCarouselList=()=>{
    return get('/carouselIndex')
}

// 退出登录
const logout=()=>{
    return post('/logout')
}

// 绑定$client_uid
const bindClient=(client_id,user_id)=>{
    return get('/bind?client_id=' + client_id + '&user_id=' + user_id)
}

// 获取验证码
const sendSmsCode=(phone_num)=>{
    return post('/sendSmsCode',phone_num )
}

const validateCode=(code)=>{
    return post('/validateCode',code)
}

export{getHome,getUserInfo,updateUserInfo,getMenuById,getRuleBack,getRole,getRuleByRole,changeRoleRule,delRule,addRule,getRuleDetail,editRule,getCarouselList,
    logout,
    bindClient,
    sendSmsCode,
    validateCode
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             