// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除风险分析 DELETE /api/riskPrediction */
export async function deleteRiskPredictionUsingDelete(options?: { [key: string]: any }) {
  return request<API.RBoolean_>('/api/riskPrediction', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 添加风险分析 POST /api/riskPrediction/generate */
export async function generateRiskPredictionUsingPost(options?: { [key: string]: any }) {
  return request<API.RBoolean_>('/api/riskPrediction/generate', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取风险分析 GET /api/riskPrediction/get */
export async function getRiskPredictionUsingGet(options?: { [key: string]: any }) {
  return request<API.RRiskPrediction_>('/api/riskPrediction/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页获取用户饮食信息 POST /api/riskPrediction/page */
export async function getRiskPredictionPageUsingPost(
  body: API.RiskPredictionQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RPageRiskPrediction_>('/api/riskPrediction/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新风险分析 POST /api/riskPrediction/update */
export async function updateRiskPredictionUsingPost(
  body: API.RiskPredictionDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/riskPrediction/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
