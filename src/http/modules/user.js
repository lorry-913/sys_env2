import axios from '../axios'

/*
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/user/save',
        method: 'post',
        data
    })
}

// 编辑
export const edit = (data) => {
  return axios({
    url: '/user/edit',
    method: 'post',
    data
  })
}

// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/user/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/user/getAllUser',
        method: 'post',
        data
    })
}


// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
    return axios({
        url: '/user/findPermissions',
        method: 'get',
        params
    })
}



// 查找用户的菜单权限标识集合
export const getUserExcle = (data) => {
  return axios({
    url: '/user/getUserExcel',
    method: 'post',
    data
  })
}

// 查找用户的菜单权限标识集合
export const getUserCenter = (params) => {
  return axios({
    url: '/user/getUserCenter',
    method: 'get',
    params
  })
}
