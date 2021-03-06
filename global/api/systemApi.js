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

// 获取轮播图列表
const getCarousel=(page,pageSize)=>{
    return get('/carousel?page=' + page + '&pageSize=' + pageSize)
}

// 获取轮播图详细信息
const getCarouselInfo=(id)=>{
    return get('/carouselInfo?id=' + id);
}

// 更新轮播图详细信息
const updateCarouselInfo=(params)=>{
    return put('/carousel',params);
}

// 新增轮播图
const addCarousel=(params)=>{
    return post('/carousel',params);
}

export{getParameterList,getParameterInitList,getParameterDetail,editParameter,addParameter,deleteParameter,getCarousel,getCarouselInfo,
    updateCarouselInfo,
    addCarousel}