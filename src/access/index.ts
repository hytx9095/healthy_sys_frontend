import store from "@/store";
import router from "@/router";
import AccessEnum from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

//管理员可见，判断当前用户是否为管理员
router.beforeEach(async (to, from, next) => {
  // 判断是否登录
  if (to.meta.requiredAuth) {
    if (window.localStorage.getItem("Authorization")) {
      next();
    } else {
      next({ path: "/user/login?/redirect=${to.fullPath}" });
    }
  } else {
    next();
  }

  //如果之前没有登录过，自动登录
  const loginUser = store.state.user.loginUser;
  if (!loginUser || !loginUser.role) {
    console.log("自动登录");
    await store.dispatch("user/getLoginUser");
  }

  // const needAccess = (to.meta?.access as string) ?? AccessEnum.NOT_LOGIN;
  // //要跳转的页面不需要登录
  // if (needAccess !== AccessEnum.NOT_LOGIN) {
  //   //如果没有跳转，跳转到登录界面
  //   if (!loginUser || !loginUser.role) {
  //     next({ path: "/user/login?/redirect=${to.fullPath}" });
  //     return;
  //   }
  //   //如果用户登录，但是权限不足
  //   if (!checkAccess(loginUser, needAccess)) {
  //     next({ path: "/noAuth" });
  //     return;
  //   }
  // }
  next();
});
