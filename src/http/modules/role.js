import axios from '../axios'

/*
 * 角色管理模块
 */

// 保存
export const add = (data) => {
    return axios({
        url: '/role/add',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (params) => {
    return axios({
        url: '/role/delete',
        method: 'get',
        params
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/role/findPage',
        method: 'post',
        data
    })
}
// 查询全部
export const findAll = () => {
    return axios({
        url: '/role/findAll',
        method: 'get'
    })
}
// 查询角色菜单集合
export const findRoleMenus = (params) => {
    return axios({
        url: '/role/findRoleMenus',
        method: 'get',
        params
    })
}
// 保存角色菜单集合
export const saveRoleMenus = (data) => {
    return axios({
        url: '/role/add',
        method: 'post',
        data
    })
}
