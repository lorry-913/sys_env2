import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import NotFound from '@/views/404'
import api from '@/http/api'
import {getUserCookie} from "../utils/Auth";
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: []
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/404',
      name: 'notFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 存在时间为会话生命周期，页面关闭即失效。
  let userName = getUserCookie()
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (userName) {
      next({path: '/'})
    } else {
      next()
    }
  } else {
    if (!userName) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({path: '/login'})
    } else {
      // 加载动态菜单和路由
      addDynamicMenuAndRoutes(userName, to, from)
      next()
    }
  }
})

/**
 * 加载动态菜单和路由
 */
function addDynamicMenuAndRoutes(userName, to, from) {
  if (store.state.app.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.')
    return
  }
  let menuParams={
    name:userName
  }
  api.menu.findNavTree(menuParams).then(res=>{
    console.log("/menu/findNavTree")
    console.log(JSON.stringify(res.data))
    let dynamicRoutes = addDynamicRoutes(res.data)
    // console.log(JSON.stringify(dynamicRoutes))
    //routes[0]首页 在首页下添加子页面
    router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
    router.addRoutes(router.options.routes)
    // 保存加载状态
    store.commit('menuRouteLoaded', true)
    // 保存菜单树
    store.commit('setNavTree', res.data)
  }).then(res=>{
      api.user.findPermissions({'name': userName}).then(res => {
        // 保存用户权限标识集合
        console.log("权限 增删改查")
        console.log("/user/findPermissions")
        console.log(JSON.stringify(res.data))
        store.commit('setPerms', res.data)
      })
  })
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function addDynamicRoutes(menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id
        }
      }
      try {
        // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
        // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
        let array = menuList[i].url.split('/')
        let url = ''
        for (let i = 0; i < array.length; i++) {
          url += array[i].substring(0, 1).toUpperCase() + array[i].substring(1) + '/'
        }
        url = url.substring(0, url.length - 1)
        route['component'] = resolve => require([`@/views/${url}`], resolve)
      } catch (e) {
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
}

export default router
