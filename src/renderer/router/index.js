/* eslint-disable vue/no-parsing-error */
import Vue from 'vue'
import Router from 'vue-router'

const Index = resolve => {
  import('@/components/index').then(module => {
    resolve(module)
  })
}

const Folder = resolve => {
  import('@/components/folder').then(module => {
    resolve(module)
  })
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      // component: require('@/components/index').default
      component: Index
    },
    {
      path: '*',
      redirect: '/computer'
    },
    {
      path: '/computer',
      name: 'index',
      component: Index,
      children: [{
        path: '/computer/:id',
        name: 'folder',
        component: Folder
      }]
    }
  ]
})
