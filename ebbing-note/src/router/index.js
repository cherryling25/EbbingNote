import Vue from "vue";
import VueRouter from "vue-router";
import note from '../components/note.vue';

Vue.use(VueRouter);

export const constantRouterMap = [
  { path: '/', component: () => import('@/views/login')},
  { path: '/success', component: () => import('@/views/success')},
  { path: '/error', component: () => import('@/views/error'), hidden: true },
  { path: '/home/:id', component: () => import('@/views/Home'),
  children: [
    {
      path: 'note/:id',
      component: note
    }
  ]
}
]

export default new VueRouter({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap //指定路由列表
})
