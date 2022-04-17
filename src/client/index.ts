import request from "./request"
import { URLParamType } from '../types/types'
import Taro from "@tarojs/taro"
const BASEURL = 'https://www.gdyg5.top:3000'

class Client {
    //请求ocr文字识别接口
    requestUrlOcrText = (url: string, data: URLParamType) => {
        return request.post(url, data)
    }

    requestInterface = (url: string, data: URLParamType) => {
        return Taro.request({
          url: BASEURL + url,
          method: 'POST',
          data,
          header: {
            'content-type': 'application/json'
          }
        })
    }

    imgUploadInterface = (url: string, filePath: string, callback) => {
        Taro.uploadFile({
          url: BASEURL + url, //仅为示例，非真实的接口地址
          filePath,
          name: 'file',
          success (res){
              callback(res)
          }
        }).catch(err => Taro.hideLoading())
    }
  
    urlUploadInterface = (url: string, imgUrl: string) => { 
      return Taro.request({
        url: BASEURL + url + `?url=${imgUrl}`, //仅为示例，非真实的接口地址
        method: 'GET'
      })
    }
}

export default new Client()