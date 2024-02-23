// Composables
import { CustomRouteRecordRaw } from 'vue-router'

const routes: CustomRouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
    name: 'HomeView',
    meta: {
      title: 'Eleições',
      requiresAuth: true,
    },
  },
  {
    path: '/election/:id',
    component: () => import('../views/ElectionView.vue'),
    name: 'ElectionView',
    meta: {
      title: 'Eleição para []',
      requiresAuth: true,
    },
    props: (router) => ({ id: router.params.id }),
  },
  {
    path: '/ballotbox/:id',
    meta: {
      title: '',
      requiresAuth: false,
    },
    children: [
      {
        name: 'BallotBoxView',
        path: 'vote',
        component: () => import('../views/BallotBoxView.vue'),
        meta: {
          requiresAuth: false,
          hideAppBar: true,
          title: 'Urna Eletrônica',
        },
        props: (router) => ({ id: router.params.id }),
        beforeEnter: (to, from, next) => {
          const electionReady = false
          //const electionReady = true
          if (!electionReady) {
            next({ name: 'BallotBoxNotReady', params: { id: to.params.id } })
          } else {
            next()
          }
        },
      },
      {
        name: 'BallotBoxAdmin',
        path: 'admin',
        component: () => import('../views/BallotBoxAdmin.vue'),
        meta: {
          requiresAuth: true,
          hideAppBar: false,
          title: 'Administração Urna',
        },
        props: (router) => ({ id: router.params.id }),
      },
      {
        name: 'BallotBoxNotReady',
        path: 'notready',
        component: () => import('../views/BallotBoxNotReady.vue'),
        meta: {
          requiresAuth: false,
          hideAppBar: false,
          title: 'Eleição Inativa',
        },
        props: (router) => ({ id: router.params.id }),
      },
    ],
  },
  {
    path: '/about',
    component: () => import('../views/AboutView.vue'),
    name: 'AboutView',
    meta: {
      title: 'Sobre',
      requiresAuth: false,
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '404 - Página não encontrada',
      requiresAuth: false,
    },
  },
]

export default routes
