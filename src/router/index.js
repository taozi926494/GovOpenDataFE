import Vue from 'vue'
import Router from 'vue-router'


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
            component: () =>
                import ('@/pages/home/home.vue')
        },
        {
            path: '/datasetList',
            name: 'datasetList',
            component: () =>
                import ('@/pages/datasetlist/datasetlist.vue')
        },
        {
            path: '/datasetInfo',
            name: 'datasetInfo',
            component: () =>
                import ('@/pages/datasetInfo/datasetInfo.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('@/pages/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () =>
                import ('@/pages/Register.vue')
        },
        {
            path: '/news',
            name: 'news',
            component: () =>
                import ('@/pages/news/news.vue')
        },
        {
            path: '/statistic',
            name: 'statistic',
            component: () =>
                import ('@/pages/statistic/statistic.vue')
        }, {
            path: '*',
            name: 'notFound',
            component: () =>
                import ('@/pages/NotFound.vue')
        }
    ]
})