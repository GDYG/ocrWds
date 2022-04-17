import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import OcrStore from '../../store/ocrStore'
import { inject, observer } from 'mobx-react'
import { AtNoticebar, AtButton, AtTag, AtInput } from 'taro-ui'
import './index.scss'
import { TextType } from '../../types/types'
import { chooseMedia } from '../../utils/index'
import { ReponseOcrResult } from '../../types/types'
interface IndexPropsType {
  ocrStore: OcrStore
}
@inject('ocrStore')
@observer
class Index extends Component<IndexPropsType, {url: string}> {

  constructor(props) { 
    super(props)
    this.state = { url: '' }
  }

  onShareAppMessage() {
    return {
      title: '文字识别',
    }
  }

  onShareTimeline() { 
    return {
      title: '文字识别'
    }
  }

  selectMedia = () => {
    chooseMedia((res: ReponseOcrResult) => {
      const wordsArr = JSON.parse(res?.data || '')
      this.props.ocrStore.setWordsOCR(wordsArr)
    })
  }
  
  inputUrl = () => { 
    const URL = this.state.url
    if(!URL) return
    this.props.ocrStore.setWordsImgUrl(URL)
  }

  componentWillUnmount() { 
    this.setState({url: ''})
  }

  render() {
    const { TextWords, Imgtype} = this.props.ocrStore
    return (
      <View className='index'>
        <AtNoticebar marquee>
          { TextWords.get(TextType.AtNoticebar) }
        </AtNoticebar>
        <View className='selectMode'>
          <AtInput
            clear
            name='url'
            type='text'
            focus
            placeholder='图片URL'
            value={this.state.url}
            onChange={(v) => { this.setState({ url: typeof v == 'string' ? v : '' }); return v}}
          >
            <AtButton type='secondary' onClick={this.inputUrl}>{ TextWords.get(TextType.Done) }</AtButton>
          </AtInput>
          <AtButton type='primary' onClick={this.selectMedia} circle>{ TextWords.get(TextType.OcrText) }</AtButton>
          <View className='tips'>{ TextWords.get(TextType.TIPS) }</View>
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
