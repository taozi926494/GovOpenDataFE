import request from '../utils/request.js'


export function getDatasetDetailApi(id) {
    return new Promise((resolve, reject) => {
        request({
            url: '/dataset',
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