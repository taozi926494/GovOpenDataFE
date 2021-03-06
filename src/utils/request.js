import axios from 'axios'
import { Message } from 'element-ui'
import { BASE_URL } from '@/api/init';


// 创建axios实例
const service = axios.create({
    // baseURL: 'http://172.16.119.6:5080',
    baseURL: BASE_URL,
    timeout: 15000, // 请求超时时间
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    withCredentials: true // 跨域session
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        if (response.data.status !== 'ok') {
            Message.error({
                message: response.message
            })
            console.log('ERROR ' + response) // for debug
        } else {
            return response.data.data
        }
    },
    error => {
        Message.error({
            message: error
        })
        console.log('err ' + error) // for debug
        return Promise.reject(error)
    }
)

export default service