// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除健康资讯 DELETE /api/healthy/news */
export async function deleteHealthyNewsUsingDelete(
  body: API.CommonDeleteDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/healthy/news', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加健康资讯 POST /api/healthy/news/add */
export async function addHealthyNewsUsingPost(
  body: API.HealthyNewsDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/healthy/news/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取健康资讯 GET /api/healthy/news/get/${param0} */
export async function getHealthyNewsUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getHealthyNewsUsingGETParams,
  options?: { [key: string]: any },
) {
  const { healthyNewsId: param0, ...queryParams } = params;
  return request<API.RHealthyNews_>(`/api/healthy/news/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取健康资讯 POST /api/healthy/news/page/vo */
export async function getHealthyNewsVoPageUsingPost(
  body: API.HealthyNewsQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RPageHealthyNewsVO_>('/api/healthy/news/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新健康资讯 POST /api/healthy/news/update */
export async function updateHealthyNewsUsingPost(
  body: API.HealthyNewsUpdateDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/healthy/news/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
