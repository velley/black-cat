// 加载资源
import 'babel-polyfill'
import 'font-awesome-webpack'
// 加载vue框架/库
import Vue from 'vue'
import router from './router'
import store from './store'
import fast from 'fastclick'//优化移动端触摸
import lazyLoad from 'vue-lazyload' //懒加载
// 加载DOM组件
import App from './App'
// 加载通用样式文件
import 'common/style/default.styl'
import 'common/js/toolBox'


fast.attach(document.body)
Vue.config.productionTip = false

Vue.use(lazyLoad,{
  loading: require('@/assets/img/cat.png')
})











/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
