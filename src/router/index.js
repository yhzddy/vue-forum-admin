import Vue from "vue";
import VueRouter from "vue-router";
import { Message } from "element-ui";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue")
  },
  {
    path: "/home",
    name: "home",
    redirect: "/welcome",
    component: () => import("../views/Home.vue"),
    meta: { requireAuth: true },
    children: [
      {
        path: "/welcome",
        component: () => import("../components/Welcome.vue")
      },
      {
        path: "/users",
        component: () => import("../components/user/User.vue")
      }
    ]
  },
  {
    path: "/kongbai",
    name: "kongbai",
    component: () => import("../views/kongbai.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  //如果该页面需要认证权限
  const tokenStr = window.localStorage.token;
  if (to.meta.requireAuth) {
    // 如果token存在
    if (tokenStr) {
      next();
    } else {
      Message.error({
        timeout: 2000,
        // showClose: true,
        message: "请先登录!",
        type: "error"
      });
      next("/login");
    }
  } else {
    //如果该页面不需要认证权限
    next();
  }
});

export default router;
