/* eslint-disable */
import type { BasicHealthInfoDTO } from "../models/BasicHealthInfoDTO";
import type { MessageDTO } from "../models/MessageDTO";
import type { R } from "../models/R";
import type { R_BasicHealthInfo_ } from "../models/R_BasicHealthInfo_";
import type { R_boolean_ } from "../models/R_boolean_";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class MessageControllerService {
  /**
   * 更新用户基本健康信息
   * @param basicHealthInfoDto basicHealthInfoDTO
   * @returns R_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addBasicHealthInfoUsingPost2(
    basicHealthInfoDto: BasicHealthInfoDTO
  ): CancelablePromise<R_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/message/add",
      body: basicHealthInfoDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`
      }
    });
  }

  /**
   * 获取信息
   * @returns R_BasicHealthInfo_ OK
   * @throws ApiError
   */
  public static getBasicHealthInfoUsingGet2(): CancelablePromise<R_BasicHealthInfo_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/message/get",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`
      }
    });
  }

  /**
   * 分页获取消息
   * @param basicHealthInfoDto basicHealthInfoDTO
   * @returns R OK
   * @returns any Created
   * @throws ApiError
   */
  public static getMessageListUsingPost1(
    basicHealthInfoDto: BasicHealthInfoDTO
  ): CancelablePromise<R | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/message/list/page",
      body: basicHealthInfoDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`
      }
    });
  }

  /**
   * 更新用户基本健康信息
   * @param messageDto messageDTO
   * @returns R_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static sendMessageBySystemUsingPost(
    messageDto: MessageDTO
  ): CancelablePromise<R_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/message/send/system",
      body: messageDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`
      }
    });
  }

  /**
   * 更新用户基本健康信息
   * @param basicHealthInfoDto basicHealthInfoDTO
   * @returns R OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateBasicHealthInfoUsingPost2(
    basicHealthInfoDto: BasicHealthInfoDTO
  ): CancelablePromise<R | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/message/update",
      body: basicHealthInfoDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`
      }
    });
  }
}
