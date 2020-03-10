import request from '../utils/request.js'



export function getIndexApi() {
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