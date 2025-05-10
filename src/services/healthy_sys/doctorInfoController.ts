// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除医生信息 DELETE /api/doctor/info */
export async function deleteDoctorInfoUsingDelete(
  body: API.CommonDeleteDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/doctor/info', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加医生信息 POST /api/doctor/info/add */
export async function addDoctorInfoUsingPost(
  body: API.DoctorInfoDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/doctor/info/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 审核医生信息 POST /api/doctor/info/examine */
export async function doctorExamineUsingPost(
  body: API.DoctorInfoExamineDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/doctor/info/examine', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取医生信息 GET /api/doctor/info/get/${param0} */
export async function getDoctorInfoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDoctorInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  const { doctorInfoId: param0, ...queryParams } = params;
  return request<API.RDoctorInfo_>(`/api/doctor/info/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取医生信息 POST /api/doctor/info/manage/page */
export async function getDoctorInfoPageByManageUsingPost(
  body: API.DoctorInfoQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RIPageDoctorInfoVO_>('/api/doctor/info/manage/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新医生信息 POST /api/doctor/info/update */
export async function updateDoctorInfoUsingPost(
  body: API.DoctorInfoUpdateDTO,
  options?: { [key: string]: any },
) {
  return request<API.RBoolean_>('/api/doctor/info/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取医生信息 POST /api/doctor/info/user/page */
export async function getDoctorInfoPageByUserUsingPost(
  body: API.DoctorInfoQueryDTO,
  options?: { [key: string]: any },
) {
  return request<API.RIPageDoctorInfoVO_>('/api/doctor/info/user/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
