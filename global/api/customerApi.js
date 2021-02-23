import {post,get,deletes,put} from '../fetch.js';

// 客户类接口

/* 租客客户列表 */
const getHomeCustomer=(page,pageSize,keywords,origin)=>{
    return get('/homeCustomer?page=' + page + '&pageSize=' + pageSize + '&keywords=' + keywords + '&origin=' + origin)    
}

/* 新增租客客户信息 */
const addHomeCustomer=(params)=>{
    return post('/homeCustomer',params);
}

/* 获取租客客户详情 */
const getDetailById=(id)=>{
    return get('/homeCustomerDetail?id=' + id);
}

/* 更新租客客户信息 */
const updateInfo=(params)=>{
    return put('/homeCustomer',params);
}

export{getHomeCustomer,addHomeCustomer,getDetailById,updateInfo}