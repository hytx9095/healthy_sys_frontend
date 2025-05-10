// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除用户 DELETE /api/user */
export async function deleteUserUsingDelete(
  body: API.CommonDeleteDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/user', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户头像 POST /api/user/change/avatar */
export async function changeUserAvatarUsingPost(
  body: {},
  image?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (image) {
    formData.append('image', image);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.RBoolean_>('/api/user/change/avatar', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 更新用户密码 POST /api/user/change/password */
export async function changeUserPasswordUsingPost(
  body: API.UserChangePasswordDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/user/change/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 找回密码 POST /api/user/findPassword */
export async function findPasswordUsingPost(
  body: API.UserFindPasswordDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/user/findPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户信息 GET /api/user/get */
export async function getUserUsingGet(options?: { [key: string]: any }) {
  return request<API.RUserVO_>('/api/user/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取用户信息 POST /api/user/get/list */
export async function getUserListUsingPost(
  body: API.UserQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RListUserVO_>('/api/user/get/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户信息 POST /api/user/get/vo */
export async function getUserByIdUsingPost(
  body: API.GetUserVODTO,
  options?: { [key: string]: any },
) {
  return request<API.RUserVO_>('/api/user/get/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理员审核医生 POST /api/user/judge/doctor */
export async function judgeDoctorUsingPost(
  body: API.DoctorApplyDTO,
  options?: { [key: string]: any },
) {
  return request<API.R>('/api/user/judge/doctor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 密码登录 POST /api/user/login */
export async function loginUsingPost(body: API.UserLoginFormDTO, options?: { [key: string]: any }) {
  return request<API.RLoginVO_>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登出 POST /api/user/logout */
export async function logoutUsingPost(options?: { [key: string]: any }) {
  return request<API.R>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 管理员分页获取用户信息 POST /api/user/page/list */
export async function getUserPageUsingPost(
  body: API.UserQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RPageUser_>('/api/user/page/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册 POST /api/user/register */
export async function registerUsingPost(
  body: API.UserRegisterDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户 POST /api/user/update */
export async function updateUserUsingPost(
  body: API.UserUpdateDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户角色 POST /api/user/update/role */
export async function updateUserRoleUsingPost(
  body: API.UserUpdateRoleDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/user/update/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
