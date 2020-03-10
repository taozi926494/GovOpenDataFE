import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import DatasetInfo from '../pages/DatasetInfo'
import DatasetList from '../pages/DatasetList'
import Login from '../pages/Login'
import Register from '../pages/Register'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            name: 'index',

            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/datasetList',
            name: 'datasetList',
            component: DatasetList
        },
        {
            path: '/datasetInfo',
            name: 'datasetInfo',
            component: DatasetInfo
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
    ]
})