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
const getMenuById=(params)=>{
    return get('/menu',params)
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
const getRule=(params)=>{
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

export{getHome,getUserInfo,updateUserInfo,getMenuById,getRule,getRole,getRuleByRole,changeRoleRule,delRule}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             