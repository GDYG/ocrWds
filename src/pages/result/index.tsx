import { View, Text } from "@tarojs/components";
import { Component } from "react";
import { inject, observer } from 'mobx-react'
import OcrStore from "src/store/ocrStore";
import './index.scss'
import { TextType } from '../../types/types'

interface IndexPropsType {
  ocrStore: OcrStore
}

@inject('ocrStore')
@observer
class Result extends Component<IndexPropsType> {
    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        this.props.ocrStore.resetData()
    }

    render() {
        const WORDSOCR = this.props.ocrStore.wordsOCR
        const { TextWords } = this.props.ocrStore
        return (
            <View className='res-cont'>
                {
                    WORDSOCR.map(item => {
                        return <Text selectable={true} userSelect={true} key={item} className='at-article__p'>{ item }</Text>
                    })
                }
                {
                    !WORDSOCR.length && <View className='at-article__h2'>{TextWords.get(TextType.NotWords)}</View>
                }
            </View>
        )
    }
}

export default Result