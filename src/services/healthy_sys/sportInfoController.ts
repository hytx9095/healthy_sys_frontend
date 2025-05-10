// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除用户运动信息 DELETE /api/sport/info */
export async function deleteSportInfoUsingDelete(
  body: API.CommonDeleteDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/sport/info', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加用户运动信息 POST /api/sport/info/add */
export async function addSportInfoUsingPost(
  body: API.SportInfoDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/sport/info/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 生成建议 POST /api/sport/info/generate/suggestions */
export async function generateSuggestionsUsingPost(
  body: API.SportInfoDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/sport/info/generate/suggestions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户运动信息 GET /api/sport/info/get/${param0} */
export async function getSportInfoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSportInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  const { sportInfoId: param0, ...queryParams } = params;
  return request<API.RSportInfo_>(`/api/sport/info/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取用户运动信息 POST /api/sport/info/page */
export async function getSportInfoPageUsingPost(
  body: API.SportInfoQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RPageSportInfo_>('/api/sport/info/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户运动信息 POST /api/sport/info/update */
export async function updateSportInfoUsingPost(
  body: API.SportInfoUpdateDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/sport/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
