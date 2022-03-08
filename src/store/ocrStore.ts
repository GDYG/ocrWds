const Taro = require("@tarojs/taro")
import { action, makeObservable, observable } from "mobx";
import {TextType, ReponseOcrResultData} from '../types/types'

class OcrStore {

    TextWords = new Map([
        [TextType.AtNoticebar, 'OCR-WDS文字识别为方便ANDROID用户提供在线识别支持, OCR-WDS文字识别调用的百度AI-OCR文字识别'],
        [TextType.OcrText, '文字识别'],
        [TextType.ImageType, '支持的图片格式'],
        [TextType.NotWords, '图片中貌似没有文字哦😯'],
    ])

    resetData = () => {
        this.wordsOCR = []
    }

    root: any
    constructor(ele) {
        this.root = ele
        makeObservable(this)
    }

    @observable Imgtype: string[] = ['jpg', 'jpeg', 'png', 'bmp'];
    @observable wordsOCR: string[] = [];
    
    @action.bound
    setWordsOCR(data: ReponseOcrResultData) {
        this.wordsOCR = data?.words_result?.map(item => item.words) || [];
        Taro.navigateTo({
          url: '/pages/result/index'
        })
    }
}

export default OcrStore