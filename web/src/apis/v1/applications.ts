// @ts-ignore
/* eslint-disable */
///////////////////////////////////////////////////////////////////////
//                                                                   //
// this file is autogenerated by service-generate                    //
// do not edit this file manually                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
/// <reference path = "api-auto.d.ts" />
import request from "@/utils/request";
import useGlobalStore from "@/pages/globalStore";

/**
 * Get user application list
 */
export async function ApplicationControllerFindAll(
  params: Paths.ApplicationControllerFindAll.BodyParameters | any,
): Promise<Paths.ApplicationControllerFindAll.Responses> {
  // /v1/applications
  let _params: { [key: string]: any } = {
    appid: useGlobalStore.getState().currentApp?.appid || "",
    ...params,
  };
  return request(`/v1/applications`, {
    method: "GET",
    params: params,
  });
}

/**
 * Get an application by appid
 */
export async function ApplicationControllerFindOne(
  params: Paths.ApplicationControllerFindOne.BodyParameters | any,
): Promise<Paths.ApplicationControllerFindOne.Responses> {
  // /v1/applications/{appid}
  let _params: { [key: string]: any } = {
    appid: useGlobalStore.getState().currentApp?.appid || "",
    ...params,
  };
  return request(`/v1/applications/${_params.appid}`, {
    method: "GET",
    params: params,
  });
}

/**
 * Update an application
 */
export async function ApplicationControllerUpdate(
  params: Definitions.UpdateApplicationDto | any,
): Promise<Paths.ApplicationControllerUpdate.Responses> {
  // /v1/applications/{appid}
  let _params: { [key: string]: any } = {
    appid: useGlobalStore.getState().currentApp?.appid || "",
    ...params,
  };
  return request(`/v1/applications/${_params.appid}`, {
    method: "PATCH",
    data: params,
  });
}
