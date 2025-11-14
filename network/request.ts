import { BASE_URL } from "../config";
import { BaseResponse } from "./entity/BaseResponse";

const request = {
  requestInterceptors: [],
  responseInterceptors: [],
  
  useRequestInterceptor(fn: (config: any) => any) {
    this.requestInterceptors.push(fn)
  },
  
  useResponseInterceptor(fn: (res: any) => any) {
    this.responseInterceptors.push(fn)
  },
  
  fetch<T>(options: any): Promise<{
	  statusCode: number;
	  data: T;
  }> {
    let config: UniNamespace.RequestOptions = {
		method: 'GET',
		dataType: 'json',
		timeout: 10000,
		...options
	}
    for (const interceptor of this.requestInterceptors) {
      config = interceptor(config)
    }
    
    return new Promise((resolve, reject) => {
      uni.request({
        ...config,
        success: (res: UniNamespace.RequestSuccessCallbackResult) => {
			let tmp = res;
			for (const interceptor of this.responseInterceptors) {
				tmp = interceptor(tmp)
			}
			
			let { data, statusCode } = tmp;
			
			if(statusCode >= 200 && statusCode < 300) {
				resolve({
					statusCode: statusCode,
					data: (data as BaseResponse<T>).data
				})
			} else {
				reject({
					statusCode: statusCode,
					data: data
				})
			}
        },
        fail: reject
      })
    })
  }
}

request.useRequestInterceptor((config) => {
	if (!/^https?:\/\//.test(config.url)) {
	    config.url = BASE_URL + config.url;
	}
	return config;
})

request.useRequestInterceptor((config) => {
  config.header = config.header || {}
  config.header['Authorization'] = uni.getStorageSync('token')
  return config
})

request.useResponseInterceptor((res) => {
  if (res.statusCode === 401) {
    uni.redirectTo({ url: '/pages/login/login' })
  }
  return res
})

export default request