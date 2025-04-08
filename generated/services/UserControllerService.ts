/* eslint-disable */
import type { ChangeUserPasswordDTO } from "../models/ChangeUserPasswordDTO";
import type { FindPasswordDTO } from "../models/FindPasswordDTO";
import type { LoginFormDTO } from "../models/LoginFormDTO";
import type { R } from "../models/R";
import type { R_boolean_ } from "../models/R_boolean_";
import type { R_LoginVO_ } from "../models/R_LoginVO_";
import type { R_UserVO_ } from "../models/R_UserVO_";
import type { UserRegisterDTO } from "../models/UserRegisterDTO";
import type { UserUpdateDTO } from "../models/UserUpdateDTO";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class UserControllerService {
  /**
   * 删除用户
   * @returns R OK
   * @throws ApiError
   */
  public static deleteUserUsingDelete(): CancelablePromise<R> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/user",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * 更新用户密码
   * @param changeUserPasswordDto changeUserPasswordDTO
   * @returns R_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static changeUserPasswordUsingPost(
    changeUserPasswordDto: ChangeUserPasswordDTO
  ): CancelablePromise<R_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/change/password",
      body: changeUserPasswordDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 找回密码
   * @param findPasswordDto findPasswordDTO
   * @returns R_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static findPasswordUsingPost(
    findPasswordDto: FindPasswordDTO
  ): CancelablePromise<R_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/findPassword",
      body: findPasswordDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 获取用户信息
   * @returns R_UserVO_ OK
   * @throws ApiError
   */
  public static getUserUsingGet(): CancelablePromise<R_UserVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/user/get",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 密码登录
   * @param loginFormDto loginFormDTO
   * @returns R_LoginVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static loginUsingPost(
    loginFormDto: LoginFormDTO
  ): CancelablePromise<R_LoginVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/login",
      body: loginFormDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 登出
   * @returns R OK
   * @returns any Created
   * @throws ApiError
   */
  public static logoutUsingPost(): CancelablePromise<R | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/logout",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 注册
   * @param userRegisterDto userRegisterDTO
   * @returns R OK
   * @returns any Created
   * @throws ApiError
   */
  public static registerUsingPost(
    userRegisterDto: UserRegisterDTO
  ): CancelablePromise<R | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/register",
      body: userRegisterDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 更新用户
   * @param userUpdateDto userUpdateDTO
   * @returns R OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateUserUsingPost(
    userUpdateDto: UserUpdateDTO
  ): CancelablePromise<R | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/update",
      body: userUpdateDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
