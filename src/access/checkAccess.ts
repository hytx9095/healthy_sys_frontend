/**
 * @description 权限校验
 * @param loginUser 当前登录用户
 * @param needAccess 需要校验的权限
 * @returns {boolean}
 */
import ACCESS_NUM from "@/access/accessEnum";

const checkAccess = (loginUser: any, needAccess = ACCESS_NUM.NOT_LOGIN) => {
  const loginUserAccess = loginUser?.role ?? ACCESS_NUM.NOT_LOGIN;
  if (needAccess === ACCESS_NUM.NOT_LOGIN) {
    return true;
  }

  // 普通用户权限
  if (needAccess === ACCESS_NUM.USER) {
    if (loginUserAccess === ACCESS_NUM.NOT_LOGIN) {
      return false;
    }
  }

  // 管理员权限
  if (needAccess === ACCESS_NUM.ADMIN) {
    if (loginUserAccess !== ACCESS_NUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
