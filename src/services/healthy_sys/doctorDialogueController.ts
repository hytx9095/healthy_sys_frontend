// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除助手对话 DELETE /api/doctor/dialogue */
export async function deleteDoctorDialogueUsingDelete(
  body: API.DoctorDialogueDeleteDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/doctor/dialogue', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 医生回答 POST /api/doctor/dialogue/answer */
export async function answerUsingPost(
  body: API.DoctorDialogueDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/doctor/dialogue/answer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户提问 POST /api/doctor/dialogue/ask */
export async function askUsingPost(body: API.DoctorDialogueDTO, options?: { [key: string]: any }) {
  return request<API.RBoolean_>('/api/doctor/dialogue/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取对话医生列表 POST /api/doctor/dialogue/doctor/get/doctor */
export async function getDoctorDialogueDoctorUsingPost(options?: { [key: string]: any }) {
  return request<API.RListDoctorContact_>('/api/doctor/dialogue/doctor/get/doctor', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取对话用户列表 POST /api/doctor/dialogue/doctor/get/user */
export async function getDoctorDialogueUserUsingPost(options?: { [key: string]: any }) {
  return request<API.RListUserContact_>('/api/doctor/dialogue/doctor/get/user', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取对话 POST /api/doctor/dialogue/get/page */
export async function getDoctorDialoguePageUsingPost(
  body: API.DoctorDialogueQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RPageDoctorDialogueVO_>('/api/doctor/dialogue/get/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 重新生成 POST /api/doctor/dialogue/regenerate */
export async function regenerateDialogueUsingPost1(
  body: API.DoctorDialogueRegenerateDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/doctor/dialogue/regenerate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
