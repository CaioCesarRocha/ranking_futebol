import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        //{
           // path : '*',
           // name: '404',
           // component: () => import('./views/404Page.vue'), 
            //meta: {
                //title: "Página não encontrada",
            //}
        //},
        {
            path: '/',
            name: 'Home',
            component: () => import('./views/Home.vue'),
            meta: {
                title: "Home",
            }
        },
    ]
})

export default router  