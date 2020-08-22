import axios from '../axios'

/*
 * 认证模块
 */
// 分页查询
export const findPage = (data) => {
  return axios({
    url: '/verify/findPage',
    method: 'post',
    data
  })
}
