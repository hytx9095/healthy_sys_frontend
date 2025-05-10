// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除题目 DELETE /api/question/${param0} */
export async function deleteQuestionUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteQuestionUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { questionId: param0, ...queryParams } = params;
  return request<API.RBoolean_>(`/api/question/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 添加题目 POST /api/question/add */
export async function addQuestionUsingPost(
  body: API.QuestionDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/question/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量添加题目 POST /api/question/add/list */
export async function addHealthyKnowledgeListUsingPost1(
  body: API.QuestionListDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/question/add/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取题目 GET /api/question/get/${param0} */
export async function getQuestionUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionUsingGETParams,
  options?: { [key: string]: any },
) {
  const { questionId: param0, ...queryParams } = params;
  return request<API.RQuestion_>(`/api/question/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取试卷（分页） POST /api/question/page */
export async function getQuestionPageUsingPost(
  body: API.QuestionQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RPageQuestion_>('/api/question/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新题目 POST /api/question/update */
export async function updateQuestionUsingPost(
  body: API.QuestionDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/question/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
