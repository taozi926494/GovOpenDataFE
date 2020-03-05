import request from '../utils/request.js'
const querystring = require('querystring')



export function getDatasetDetailApi(id) {
  return new Promise((resolve, reject) => {
    request({
      url: '/detail',
      method: 'get',
      params: {
        id: id,
      }
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}


export function DownloadFileApi(form) {
  return new Promise((resolve, reject) => {
    request({
      url: '/detailInfo',
      method: 'post',
      data: querystring.stringify(form)
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}