// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 系统信息信息 POST /api/message/add */
export async function addSystemMessageUsingPost(
  body: API.MessageDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/message/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除消息 DELETE /api/message/delete */
export async function deleteMessageUsingDelete(
  body: API.MessageDeleteDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/message/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取信息 GET /api/message/get */
export async function getSystemMessageUsingGet(options?: { [key: string]: any }) {
  return request<API.RMessageVO_>('/api/message/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页获取消息 POST /api/message/page */
export async function getMessagePageUsingPost(
  body: API.MessageQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RIPageMessageVO_>('/api/message/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取消息 POST /api/message/page/status */
export async function getMessagePageByStatusUsingPost(
  body: API.MessageQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RIPageMessageVO_>('/api/message/page/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取消息 POST /api/message/page/user */
export async function getMessageUserPageUsingPost(
  body: API.MessageQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RIPageMessageVO_>('/api/message/page/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送系统信息信息 POST /api/message/send/system */
export async function sendMessageBySystemUsingPost(
  body: API.MessageDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/message/send/system', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新系统信息信息 POST /api/message/update */
export async function updateSystemMessageUsingPost(
  body: API.MessageDTO,
  options?: { [key: string]: any },
) {
  return request<API.R>('/api/message/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
