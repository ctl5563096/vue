import {post,get,deletes,put} from '../fetch.js';

// 客户类接口

/* 租客客户列表 */
const getHomeCustomer=(page,pageSize,keywords)=>{
    return get('/homeCustomer?page=' + page + '&pageSize=' + pageSize + '&keywords=' + keywords )    
}

/* 租客客户列表 */
export{getHomeCustomer}