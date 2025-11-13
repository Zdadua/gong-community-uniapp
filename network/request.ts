const request = {
  requestInterceptors: [],
  responseInterceptors: [],
  
  useRequestInterceptor(fn: (config: any) => any) {
    this.requestInterceptors.push(fn)
  },
  
  useResponseInterceptor(fn: (config: any) => any) {
    this.responseInterceptors.push(fn)
  },
  
  async fetch(options: any) {
    let config = { ...options }
    for (const interceptor of this.requestInterceptors) {
      config = await interceptor(config)
    }
    
    return new Promise((resolve, reject) => {
      uni.request({
        ...config,
        success: async (res: any) => {
          let data = res
          for (const interceptor of this.responseInterceptors) {
            data = await interceptor(data)
          }
          resolve(data)
        },
        fail: reject
      })
    })
  }
}

request.useRequestInterceptor((config) => {
  config.header = config.header || {}
  config.header['Authorization'] = uni.getStorageSync('token')
  return config
})

request.useResponseInterceptor(async (res) => {
  if (res.statusCode === 401) {
    uni.redirectTo({ url: '/pages/login/login' })
  }
  return res.data
})

export default request