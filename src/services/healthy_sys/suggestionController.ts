// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除智能建议 DELETE /api/suggestion */
export async function deleteSuggestionUsingDelete(options?: { [key: string]: any }) {
  return request<API.RBoolean_>('/api/suggestion', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 生成智能建议 POST /api/suggestion/generate */
export async function generateSuggestionUsingPost(options?: { [key: string]: any }) {
  return request<API.RBoolean_>('/api/suggestion/generate', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取智能建议（分页） POST /api/suggestion/page */
export async function getSuggestionsUsingPost(
  body: API.SuggestionQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RPageSuggestion_>('/api/suggestion/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新智能建议 POST /api/suggestion/update */
export async function updateSuggestionUsingPost(
  body: API.SuggestionDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/suggestion/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
