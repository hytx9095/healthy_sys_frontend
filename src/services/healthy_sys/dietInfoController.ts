// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除用户饮食信息 DELETE /api/diet/info */
export async function deleteDietInfoUsingDelete(
  body: API.CommonDeleteDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/diet/info', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加用户饮食信息 POST /api/diet/info/add */
export async function addDietInfoUsingPost(
  body: API.DietInfoDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/diet/info/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户饮食信息 GET /api/diet/info/get/${param0} */
export async function getDietInfoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDietInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  const { dietInfoId: param0, ...queryParams } = params;
  return request<API.RDietInfo_>(`/api/diet/info/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取用户饮食信息 POST /api/diet/info/page */
export async function getDietInfoPageUsingPost(
  body: API.DietInfoQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RPageDietInfo_>('/api/diet/info/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户饮食信息 POST /api/diet/info/update */
export async function updateDietInfoUsingPost(
  body: API.DietInfoUpdateDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/diet/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
