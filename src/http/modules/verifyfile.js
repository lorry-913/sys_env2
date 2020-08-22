import axios from '../axios'

/*
 * 认证文件模板模块
 */
export const getAllFileTemp = (params) => {
  return axios({
    url: '/fileTemp/getAllFileTemp',
    method: 'get',
    params
  })
}


/*
 * 模板下载
 */
export const download = (params) => {
  return axios({
    url: '/fileTemp/download',
    method: 'get',
    params
  })
}


/*
 * 模板下载
 */
export const deleteFileTemp= (data) => {
  return axios({
    url: '/fileTemp/delete',
    method: 'post',
    data
  })
}

/*
 * 模板上传
 */
export const upFileTemp= (params) => {
  return axios({
    url: '/fileTemp/upload',
    method: 'get',
    params
  })
}
