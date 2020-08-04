import axios from '../axios'

/*
 * 机构管理模块
 */

// 保存
export const add = (data) => {
    return axios({
        url: '/dept/add',
        method: 'post',
        data
    })
}

// 编辑
export const edit = (data) => {
  return axios({
    url: '/dept/update',
    method: 'post',
    data
  })
}

// 删除
export const deptdelete = (params) => {
    return axios({
        url: '/dept/delete',
        method: 'get',
      params
    })
}
// 查询机构树
export const findDeptTree = () => {
    return axios({
        url: '/dept/findTree',
        method: 'get'
    })
}
