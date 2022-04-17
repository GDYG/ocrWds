const Taro = require("@tarojs/taro")
import { action, makeObservable, observable } from "mobx";
import client from "../client/index";
import {TextType, ReponseOcrResultData} from '../types/types'

class OcrStore {

    TextWords = new Map([
        [TextType.AtNoticebar, '🎉OCR-WDS文字识别为方便手机端用户提供在线识别支持, OCR-WDS文字识别调用的百度AI-OCR文字识别'],
        [TextType.OcrText, '文字识别'],
        [TextType.SHARE, '分享'],
        [TextType.ImageType, '支持的图片格式'],
        [TextType.NotWords, '图片中貌似没有文字哦😯'],
        [TextType.TIPS, '🌈注: 识别结果页长按可以进行文本复制'],
        [TextType.Done, 'Done'],
    ])

    resetData = () => {
        this.wordsOCR = []
    }

    root: any
    constructor(ele) {
        this.root = ele
        makeObservable(this, {
            Imgtype: observable,
            wordsOCR: observable,
            setWordsOCR: action.bound,
            setWordsImgUrl: action.bound,
        })
    }

    Imgtype: string[] = ['jpg', 'jpeg', 'png', 'bmp'];
    wordsOCR: string[] = [];
    
    setWordsOCR(data: ReponseOcrResultData) {
        this.wordsOCR = data?.words_result?.map(item => item.words) || [];
        Taro.navigateTo({
          url: '/pages/result/index'
        })
    }

    setWordsImgUrl = (url: string) => {
        Taro.showLoading({ title: '识别中..' })
        client.urlUploadInterface('/api/v1/ocr', url).then(data => {
            Taro.hideLoading()
            this.wordsOCR = data.data?.words_result?.map(item => item.words) || [];
            Taro.navigateTo({
                url: '/pages/result/index'
            })
        }).catch(err => { 
            console.log(err);
            Taro.hideLoading()
        })
    }
}

export default OcrStore