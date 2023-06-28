enum mvBaseAPIUrl {
  live = "some live url",
  dev = "some dev url"
}

enum mvServiceUrl {
  live = "live url",
  dev = "dev url"
}

export const serviceMode: string = "dev";// live or dev

const baseURL = (serviceMode === "live") ? mvBaseAPIUrl.live : mvBaseAPIUrl.dev;
export const serviceUrl = (serviceMode === "live") ? mvServiceUrl.live : mvServiceUrl.dev;
export const baseApiUrl = baseURL;

export const cdnResUrl = "https://cdn.metadoors.io/images";


//----------------------------------------------------
/**
 * 
 * @author jerry
 * @description
 * define API url
 *
 */
 export const mvAPIUrl = Object.freeze({
  // account user
  user_authGetInfo                :   baseURL + '/Account/UserInfo',

 })

//----------------------------------------------------
// route path 
export const routePath = Object.freeze({
  login: '/login',
  logout: '/logout',
  linkin: '/linkin',

  main: '/',
  
});