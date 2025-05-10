// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除用户基本信息 DELETE /api/basic/health/info */
export async function deleteBasicHealthyInfoUsingDelete(
  body: API.CommonDeleteDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/basic/health/info', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加用户基本健康信息 POST /api/basic/health/info/add */
export async function addBasicHealthInfoUsingPost(
  body: API.BasicHealthInfoDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/basic/health/info/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户基本健康信息 GET /api/basic/health/info/get */
export async function getBasicHealthInfoUsingGet(options?: { [key: string]: any }) {
  return request<API.RBasicHealthInfo_>('/api/basic/health/info/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新用户基本健康信息 POST /api/basic/health/info/update */
export async function updateBasicHealthInfoUsingPost(
  body: API.BasicHealthInfoDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/basic/health/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
