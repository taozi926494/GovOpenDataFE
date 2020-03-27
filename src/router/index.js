import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/home'
import DatasetInfo from '../pages/datasetInfo/datasetInfo'
import DatasetList from '../pages/datasetlist/datasetlist'
import Login from '../pages/Login'
import Register from '../pages/Register'
import News from '../pages/news/news'
import NotFound from '../pages/NotFound'

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
        {
            path: '/news',
            name: 'news',
            component: News
        }, {
            path: '*',
            name: 'notFound',
            component: NotFound
        }
    ]
})