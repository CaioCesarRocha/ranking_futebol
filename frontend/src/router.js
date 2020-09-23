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
        {
            path: '/newClub',
            name: 'newClub',
            component: () => import('./views/newClub.vue'),
            meta: {
                title: "Novo Clube",
            }
        },
        {
            path: '/editClub',
            name: 'editClub',
            component: () => import('./views/editClub.vue'),
            meta: {
                title: "Editar Clube",
            }
        },
        {
            path: '/ListClub',
            name: 'ListClub',
            component: () => import('./views/ListClub.vue'),
            meta: {
                title: "Clubes Criados",
            }
        },
        {
            path: '/newLeague',
            name: 'newLeague',
            component: () => import('./views/newLeague.vue'),
            meta: {
                title: "Novo Campeonato",
            }
        }
    ]
})

export default router  