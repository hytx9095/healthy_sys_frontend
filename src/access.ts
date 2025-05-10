import {API} from "@/services/healthy_sys/typings";

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.role === 'admin',
    canUser: currentUser && currentUser.role === 'user',
    canDoctor: currentUser && currentUser.role === 'doctor',
    canRead: currentUser && currentUser.role === 'read',
  };
}
