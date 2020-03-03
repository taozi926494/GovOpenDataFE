import request from '../utils/request.js'



export function getDataApi() {
  return new Promise((resolve, reject) => {
    request({
      url: '/government',
      method: 'get',
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

