// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除助手对话 DELETE /api/assistantDialogue */
export async function deleteAssistantDialogueUsingDelete(
  body: API.AssistantDialogueDeleteDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/assistantDialogue', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 助手对话 POST /api/assistantDialogue/chat */
export async function chatUsingPost(
  body: API.AssistantDialogueDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/assistantDialogue/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取助手对话 POST /api/assistantDialogue/get/page */
export async function getAssistantDialoguePageUsingPost(
  body: API.AssistantDialogueQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RPageAssistantDialogue_>('/api/assistantDialogue/get/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 重新生成 POST /api/assistantDialogue/regenerate */
export async function regenerateDialogueUsingPost(
  body: API.AssistantDialogueRegenerateDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/assistantDialogue/regenerate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
