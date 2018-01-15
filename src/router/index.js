import Vue from 'vue'
import Router from 'vue-router'
// 获取路由组件
import Recomend from 'components/dom/recomend'
import Singer from 'components/dom/singer'
import SingerDetail from 'components/dom/singer-detail'
import Disc from 'components/dom/disc'
import Rank from 'components/dom/rank'
import RankDetail from 'components/dom/rank-detail'
import Search from 'components/dom/search'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Recomend',      
    },
    {
      path: '/Recomend',
      component: Recomend,
      children: [
        {
          path: ':id',
          component:Disc
        }
      ]
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
    {
      path: '/Rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: RankDetail
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      // children: [
      //   {
      //     path: ':id',
      //     component: RankDetail
      //   }
      // ]
    },
  ]
})
