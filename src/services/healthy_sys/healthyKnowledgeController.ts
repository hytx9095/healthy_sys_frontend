// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除健康知识 DELETE /api/healthy/knowledge */
export async function deleteHealthyKnowledgeUsingDelete(
  body: API.HealthyKnowledgeDeleteDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/healthy/knowledge', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加健康知识 POST /api/healthy/knowledge/add */
export async function addHealthyKnowledgeUsingPost(
  body: API.HealthyKnowledgeDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/healthy/knowledge/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量添加健康知识（excel) POST /api/healthy/knowledge/add/excel */
export async function addHealthyKnowledgeByExcelUsingPost(
  body: API.HealthyKnowledgeListDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/healthy/knowledge/add/excel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量添加健康知识 POST /api/healthy/knowledge/add/list */
export async function addHealthyKnowledgeListUsingPost(
  body: API.HealthyKnowledgeListDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/healthy/knowledge/add/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 审核健康知识 POST /api/healthy/knowledge/examine */
export async function examineHealthyKnowledgeUsingPost(
  body: API.HealthyKnowledgeExamineDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/healthy/knowledge/examine', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取健康知识 GET /api/healthy/knowledge/get */
export async function getHealthyKnowledgeUsingGet(options?: { [key: string]: any }) {
  return request<API.RHealthyKnowledge_>('/api/healthy/knowledge/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取首页健康知识（分页） POST /api/healthy/knowledge/home/page/vo */
export async function getHomeHealthyKnowledgeVoPageUsingPost(
  body: API.HealthyKnowledgeQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RListHealthyKnowledgeVO_>('/api/healthy/knowledge/home/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取健康知识（分页） POST /api/healthy/knowledge/page/vo */
export async function getHealthyKnowledgeVoPageUsingPost(
  body: API.HealthyKnowledgeQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RPageHealthyKnowledgeVO_>('/api/healthy/knowledge/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取健康知识（分页） POST /api/healthy/knowledge/page/vo/star */
export async function getStarHealthyKnowledgeVoPageUsingPost(
  body: API.HealthyKnowledgeQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RIPageHealthyKnowledgeVO_>('/api/healthy/knowledge/page/vo/star', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取健康知识（分页） POST /api/healthy/knowledge/page/vo/starred */
export async function getStarredHealthyKnowledgeVoPageUsingPost(
  body: API.HealthyKnowledgeQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RIPageHealthyKnowledgeVO_>('/api/healthy/knowledge/page/vo/starred', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通过用户分享的健康知识 POST /api/healthy/knowledge/pass/${param0} */
export async function passHealthyKnowledgeUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.passHealthyKnowledgeUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { healthyKnowledgeId: param0, ...queryParams } = params;
  return request<API.RBoolean_>(`/api/healthy/knowledge/pass/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 用户分享健康知识 POST /api/healthy/knowledge/share */
export async function shareHealthyKnowledgeUsingPost(
  body: API.HealthyKnowledgeDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/healthy/knowledge/share', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 收藏健康知识 POST /api/healthy/knowledge/star */
export async function starHealthyKnowledgeUsingPost(
  body: API.HealthyKnowledgeStarDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/healthy/knowledge/star', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 取消收藏健康知识 POST /api/healthy/knowledge/star/cancel */
export async function cancelStarHealthyKnowledgeUsingPost(
  body: API.HealthyKnowledgeStarDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/healthy/knowledge/star/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新健康知识 POST /api/healthy/knowledge/update */
export async function updateHealthyKnowledgeUsingPost(
  body: API.HealthyKnowledgeDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/healthy/knowledge/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
