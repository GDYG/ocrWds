import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import OcrStore from '../../store/ocrStore'
import { inject, observer } from 'mobx-react'
import { AtNoticebar, AtButton, AtTag } from 'taro-ui'
import './index.scss'
import { TextType } from '../../types/types'
import { chooseMedia } from '../../utils/index'
import { ReponseOcrResult } from '../../types/types'

interface IndexPropsType {
  ocrStore: OcrStore
}
@inject('ocrStore')
@observer
class Index extends Component<IndexPropsType> {

  constructor(props) { 
    super(props)
  }

  componentWillMount () { }

  componentDidMount() {}

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide() { }
  
  selectMedia = () => {
    chooseMedia((res: ReponseOcrResult) => {
      const wordsArr = JSON.parse(res?.data || '')
      this.props.ocrStore.setWordsOCR(wordsArr)
    })
  }

  render() {
    const { TextWords, Imgtype} = this.props.ocrStore
    return (
      <View className='index'>
        <AtNoticebar marquee>
          { TextWords.get(TextType.AtNoticebar) }
        </AtNoticebar>
        <View className='selectMode'>
          <AtButton type='primary' onClick={this.selectMedia} circle>{ TextWords.get(TextType.OcrText) }</AtButton>
        </View>
        <View className='tags'>
          <View className='tags-items'><Text>{ TextWords.get(TextType.ImageType) }</Text></View>
          {Imgtype.map(item => {
            return <AtTag key={item} circle>{ item }</AtTag>
          })}
        </View>
      </View>
    )
  }
}
export default Index
