import { BASE_URL } from "../config";
import { BaseResponse } from "./entity/BaseResponse";
import { ErrorData, UniFailError, Success, HttpError } from "../utils/networkUtils";

type RequestInterceptor = (config: any) => any;
type ResponseInterceptor = (res: any) => any;

interface Interceptors {
	requestInterceptors: Array<RequestInterceptor>,
	responseInterceptors: Array<ResponseInterceptor>,
	useRequestInterceptor: (fn: RequestInterceptor) => void,
	useResponseInterceptor: (fn: ResponseInterceptor) => void,
	fetch: <T>(options: any) => Promise<Success<T>>
}

const request: Interceptors = {
  requestInterceptors: [],
  responseInterceptors: [],
  
  useRequestInterceptor(fn: RequestInterceptor) {
    this.requestInterceptors.push(fn)
  },
  
  useResponseInterceptor(fn: (res: any) => any) {
    this.responseInterceptors.push(fn)
  },
  
  fetch<T>(options: any): Promise<Success<T>> {
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
        success: (res) => {
			let tmp = res;
			for (const interceptor of this.responseInterceptors) {
				tmp = interceptor(tmp)
			}
			
			let { data, statusCode, header } = tmp;
			
			if(statusCode >= 200 && statusCode < 300) {
				resolve({
					statusCode: statusCode,
					result: data as BaseResponse<T>,
					header: header
				})
			} else {
				reject({
					statusCode: statusCode,
					errMsg: (data as ErrorData).message
				})
			}
        },
        fail: (err: UniFailError) => {
			reject(err)
		}
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
    // uni.redirectTo({ url: '/pages/login/login' })
  }
  return res
})

export default request

export async function fetchNoError<T>(options: any): Promise<Success<T> | undefined> {
	try {
		const res = await request.fetch<T>(options)
		
		return res
	} catch(err) {
		if (typeof err === 'object' && err !== null && 'statusCode' in err) {
			const e = (err as unknown) as HttpError;
			console.error(`statusCode: ${e.statusCode} errMsg: ${e.errMsg}`);
		} else {
			console.error('未知错误', err);
		}
	}
}