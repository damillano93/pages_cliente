import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/pages",
      name: "pages",
      component: () => import("./components/pages/Pages")
    },
    {
      path: "/pages/add",
      name: "addpages",
      component: () => import("./components/pages/AddPages")
    },
    {
      path: "/pages/edit/:id",
      name: "editpages",
      component: () => import("./components/pages/EditPages")
    },
    {
      path: "/pages/detail/:id",
      name: "detailpages",
      component: () => import("./components/pages/DetailPages")
    },
    {
      path: "/home",
      name: "home",
      component: () => import("./components/Home")
    },
    {
      path: "/",
      name: "init",
      component: () => import("./components/Home")
    },
    {
      path: "/modal",
      name: "modal",
      component: () => import("./components/Modal")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/Login")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/Login")
    },
  ]
});
router.beforeEach((to, from, next) => {
  let ls = localStorage.getItem('token');
  if (to.name !=='login' && ls === null) next({name:'login'})
  else if (to.name ==='login' && ls!== null) next({name:'home'})
  else next()

});

export default router;