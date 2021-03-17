import Vue from 'vue';
import VueRouter from 'vue-router';

import Layout from '@/components/Layout/Layout';

// Pages
import Dashboard from '@/pages/Dashboard/Dashboard';
import OTA from '@/pages/OTA/OTA';
// import Typography from '@/pages/Typography/Typography'
// import Tables from '@/pages/Tables/Basic'
// import Notifications from '@/pages/Notifications/Notifications'
// import Icons from '@/pages/Icons/Icons'
// import Charts from '@/pages/Charts/Charts'
// import Maps from '@/pages/Maps/Google'
import Error from "@/pages/Error/Error";
import Login from "@/pages/Login/Login";

import VueLocalStorage from 'vue-localstorage'
 

// Or you can specify any other name and use it via this.$ls, this.$whatEverYouWant
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true //created computed members from your variable declarations
})


Vue.use(VueRouter);


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
  path: '/',
  // redirect: 'login',
  name: 'Layout',
  component: Layout,
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: 'OTA',
      name: 'OTA',
      component: OTA,
    },
    // {
    //   path: 'typography',
    //   name: 'Typography',
    //   component: Typography,
    // },
    // {
    //   path: 'tables',
    //   name: 'Tables',
    //   component: Tables
    // },
    // {
    //   path: 'notifications',
    //   name: 'Notifications',
    //   component: Notifications
    // },
    // {
    //   path: 'icons',
    //   name: 'Icons',
    //   component: Icons
    // },
    // {
    //   path: 'charts',
    //   name: 'Charts',
    //   component: Charts
    // },
    // {
    //   path: 'maps',
    //   name: 'Maps',
    //   component: Maps
    // },
  ],
},
  {
    path: '*',
    name: 'Error',
    component: Error
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})



router.beforeEach((to, from, next) => {
  // console.log("aaaa",Vue.ls.get('authenticated'));
  // next()
  
  if (to.name !== 'Login' && !Vue.ls.get('authenticated')) {
    console.log('1');
    next({ name: 'Login' })
  } else if (to.name === 'Login' && Vue.ls.get('authenticated')) {
    console.log('2');
    next({ name: 'Dashboard' })
  } else {
    console.log('3');
    next()
  }
})


export default router

// export default new Router({
  
  
  
//   routes
// });
