// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除用户疾病信息 DELETE /api/disease/info */
export async function deleteDiseaseInfoUsingDelete(
  body: API.CommonDeleteDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/disease/info', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加用户疾病信息 POST /api/disease/info/add */
export async function addDiseaseInfoUsingPost(
  body: API.DiseaseInfoDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/disease/info/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户疾病信息 GET /api/disease/info/get/${param0} */
export async function getDiseaseInfoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDiseaseInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  const { DiseaseInfoId: param0, ...queryParams } = params;
  return request<API.RDiseaseInfo_>(`/api/disease/info/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取用户疾病信息 POST /api/disease/info/page */
export async function getDiseaseInfoPageUsingPost(
  body: API.DiseaseInfoQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RPageDiseaseInfo_>('/api/disease/info/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户疾病信息 POST /api/disease/info/update */
export async function updateDiseaseInfoUsingPost(
  body: API.DiseaseInfoUpdateDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/disease/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
