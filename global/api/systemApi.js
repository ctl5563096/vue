import {post,get,deletes,put} from '../../global/fetch.js';

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

// 修改参数
const editParameter=(params)=>{
    return put('/parameter',params)
}

// 新增参数
const addParameter=(params)=>{
    return post('/parameter',params)
}

// 删除参数
const deleteParameter=(id)=>{
    return deletes('/parameter?id=' + id)
}
export{getParameterList,getParameterInitList,getParameterDetail,editParameter,addParameter,deleteParameter}