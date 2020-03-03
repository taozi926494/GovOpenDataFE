import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import DatasetInfo from '../pages/DatasetInfo'
import DatasetList from '../pages/DatasetList'

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
            path: '/dataset_list/:government',
            name: 'DatasetList',
            component: DatasetList
        },
        {
            path: '/dataset_info/:government/:dataset',
            name: 'DatasetInfo',
            component: DatasetInfo
        },
    ]
})