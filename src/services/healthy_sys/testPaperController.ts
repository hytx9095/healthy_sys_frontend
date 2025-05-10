// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除试卷 DELETE /api/testPaper/${param0} */
export async function deleteTestPaperUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTestPaperUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { testPaperId: param0, ...queryParams } = params;
  return request<API.RBoolean_>(`/api/testPaper/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新试卷 POST /api/testPaper/answer */
export async function answerTestPaperUsingPost(
  body: API.TestPaperDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/testPaper/answer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 生成试卷 POST /api/testPaper/generate */
export async function generateTestPaperUsingPost(options?: { [key: string]: any }) {
  return request<API.RBoolean_>('/api/testPaper/generate', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取试卷 GET /api/testPaper/get/${param0} */
export async function getTestPaperUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTestPaperUsingGETParams,
  options?: { [key: string]: any },
) {
  const { testPaperId: param0, ...queryParams } = params;
  return request<API.RTestPaper_>(`/api/testPaper/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取试卷（分页） POST /api/testPaper/page */
export async function getTestPaperPageUsingPost(
  body: API.TestPaperQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RPageTestPaper_>('/api/testPaper/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
