// 对axios 的封装
import axios from 'axios'

export function request(config){
    // 1 创建 axios 的实例
  const instance = axios.create({
      // baseURL:"http://123.207.32.32:8000",
      //  加老师的微信获取最新的接口
      timeout: 5000
  })
  // 2 axios 的拦截器
  instance.interceptors.request.use(config =>{
      // 这里记得要返回
      return config;
  }),err =>{
    console.log(err);
  }
  instance.interceptors.request.use(res =>{
    //   console.log(res);
      return res
  }, err =>{
      console.log(err);
      
  })
  // 3 发送真正的网络请求
  return instance(config)
}