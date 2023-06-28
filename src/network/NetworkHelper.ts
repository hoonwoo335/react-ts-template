import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import queryString from 'query-string';


// API 호출
export async function callAPI(url:string, param:any) {
  const res: AxiosResponse<any> = await axios.post(url, param)
  //return res.data;
  return res;
}

export async function callAPIGet(url:string) {
  const res: AxiosResponse<any> = await axios.get(url)
  return res;
}

// API 호출 //헤더 수정이 필요할 경우 사용
export async function callAPIEx(url:string, param:any, headers: any) {
  const res: AxiosResponse<any> = await axios.post(url, param, { headers })
  return res;
}

// cookie 관련 withCreadentials 옵션 추가 by jerry_210707
export async function callAPIwithCreadential(url:string, param: any) {
  const reqConfig: AxiosRequestConfig = {
    withCredentials: true
  }
  const res = await axios.post(url, param, reqConfig)
  return res;
}

export async function callAPIExWithCreadential(url: string, param: any, headers: any) {
  const reqConfig: AxiosRequestConfig = {
    headers: headers,
    withCredentials: true
  }
  const res = await axios.post(url, param, reqConfig)
  return res;
}