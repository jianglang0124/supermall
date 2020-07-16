import {request} from './request'

export function getHomeMultidata() {
   return  request({
    //    url :"http://123.207.32.32:8000/home/multidata"
       url :"home/multidata"

   })
}

export function getHomeGoods(type,page){
     return  request({
         url: "/home/data",
        //   url: "http://127.0.0.1:3000/"+type,
         params:{
             type,
             page
         }
     })
}