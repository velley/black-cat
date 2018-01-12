import Vue from 'vue'
import Router from 'vue-router'
// 获取路由组件
import Recomend from 'components/dom/recomend'
import Singer from 'components/dom/singer'
import SingerDetail from 'components/dom/singer-detail'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Recomend',      
    },
    {
      path: '/Recomend',
      component: Recomend
    },
    {
      path: '/Singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
  ]
})
