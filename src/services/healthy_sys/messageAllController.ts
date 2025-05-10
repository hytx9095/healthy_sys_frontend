// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新用户基本健康信息 POST /api/message_all/add */
export async function addBasicHealthInfoUsingPost1(
  body: API.BasicHealthInfoDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/message_all/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取信息 GET /api/message_all/get */
export async function getBasicHealthInfoUsingGet1(options?: { [key: string]: any }) {
  return request<API.RBasicHealthInfo_>('/api/message_all/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页获取消息 POST /api/message_all/list/page */
export async function getMessageListUsingPost(
  body: API.BasicHealthInfoDTO,
  options?: { [key: string]: any },
) {
  return request<API.R>('/api/message_all/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送全体消息 POST /api/message_all/send */
export async function sendMessageUsingPost(body: API.MessageDTO, options?: { [key: string]: any }) {
  return request<API.RBoolean_>('/api/message_all/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户基本健康信息 POST /api/message_all/update */
export async function updateBasicHealthInfoUsingPost1(
  body: API.BasicHealthInfoDTO,
  options?: { [key: string]: any },
) {
  return request<API.R>('/api/message_all/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
