import Vue from "vue";
import VueRouter from "vue-router";
import aside from '../components/aside.vue';
import doc from '../components/doc.vue';
import main from '../components/main.vue';

Vue.use(VueRouter);

export const constantRouterMap = [
  { path: '/', component: () => import('@/views/login')},
  { path: '/success', component: () => import('@/views/success')},
  { path: '/error', component: () => import('@/views/error'), hidden: true },
  { path: '/home', component: () => import('@/views/home'),
  children: [
    {
      path: 'aside',
      component: aside
    },
    {
      path: 'doc',
      component: doc
    },
    {
      path: 'main',
      component: main
    }
  ]
}
]

export default new VueRouter({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap //指定路由列表
})
