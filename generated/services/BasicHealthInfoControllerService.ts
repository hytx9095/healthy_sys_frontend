/* eslint-disable */
import type { BasicHealthInfoDTO } from "../models/BasicHealthInfoDTO";
import type { R } from "../models/R";
import type { R_BasicHealthInfo_ } from "../models/R_BasicHealthInfo_";
import type { R_boolean_ } from "../models/R_boolean_";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class BasicHealthInfoControllerService {
  /**
   * 更新用户基本健康信息
   * @param basicHealthInfoDto basicHealthInfoDTO
   * @returns R_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addBasicHealthInfoUsingPost(
    basicHealthInfoDto: BasicHealthInfoDTO
  ): CancelablePromise<R_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/basic/health/info/add",
      body: basicHealthInfoDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 获取用户基本健康信息
   * @returns R_BasicHealthInfo_ OK
   * @throws ApiError
   */
  public static getBasicHealthInfoUsingGet(): CancelablePromise<R_BasicHealthInfo_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/basic/health/info/get",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 更新用户基本健康信息
   * @param basicHealthInfoDto basicHealthInfoDTO
   * @returns R OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateBasicHealthInfoUsingPost(
    basicHealthInfoDto: BasicHealthInfoDTO
  ): CancelablePromise<R | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/basic/health/info/update",
      body: basicHealthInfoDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
