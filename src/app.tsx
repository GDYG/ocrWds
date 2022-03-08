import { Component } from 'react'
import { Provider } from 'mobx-react'
import store from './store/index'
import 'taro-ui/dist/style/index.scss'
import './app.scss'

class App extends Component {

  constructor(props) {
    super(props)
  }
  
  componentDidMount() { }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return <Provider {...store}>{this.props.children}</Provider>
  }
}

export default App
