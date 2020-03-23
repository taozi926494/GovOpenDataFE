import request from '../utils/request.js'

export function getNewsListApi(params) {
    return new Promise((resolve, reject) => {
        request({
            url: '/news',
            method: 'get',
            params: params
        }).then((res) => {
            resolve(res)
        }).catch((e) => {
            reject(e)
        })
    })
}