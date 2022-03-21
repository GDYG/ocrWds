import Taro from '@tarojs/taro'
import { ReponseOcrResult } from '../types/types'
const TOASTTEXT = '加载失败'
import client from '../client/index'

export const chooseMedia = (callback) => {
    Taro.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
          Taro.showLoading({
              title: '识别中..',
          })
          client.imgUploadInterface('/api/v2/ocr', res.tempFiles[0].tempFilePath, (ret: ReponseOcrResult) => {
            Taro.hideLoading()
            callback(ret)
          })
      },
      fail(err) {
        console.log(err)
        // Taro.showToast({
        //     title: TOASTTEXT,
        //     icon: 'error',
        //     duration: 2000,
        // })
      }
    })
}