import axios from '../axios'

/*
 * 菜单管理模块
 */

 // 保存
export const save = (data) => {
    return axios({
        url: '/menu/save',
        method: 'post',
        data
    })
}

export const edit = (data) => {
  return axios({
    url: '/menu/edit',
    method: 'post',
    data
  })
}

// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/menu/delete',
        method: 'post',
        data
    })
}
// 查找导航菜单树
export const findNavTree = (params) => {
    return axios({
        url: '/menu/findNavTree',
        method: 'get',
        params
    })
}
// 查找导航菜单树
export const findMenuTree = (params) => {
    return axios({
        url: '/menu/findMenuTree',
        method: 'get',
        params
    })
}

//根据名称查找菜单 findByUserName
export const findByUserName = (data) => {
  return axios({
    url: '/menu/findByUserName',
    method: 'get',
    data
  })
}
