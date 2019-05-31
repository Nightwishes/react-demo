import React, { Component } from 'react';
import { Icon } from 'antd';
import marked from 'marked';
class ArticleContent extends Component {
  componentDidMount() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
     tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    })
    this.refs.showBox.innerHTML = marked(this.props.item.content);
  }
  render () {
    return (
      <div style={wrapper}>
        <div style={close} onClick={() => {this.props.closeArticle()}}>
          <Icon type="close"/>
        </div>
        < div ref = "showBox" style={show} id="showBox">
        </div>
      </div>
    )
  }
}
const wrapper = {
  position: 'fixed',
  height: '100%',
  width: '100%',
  background: 'rgba(0,0,0,.6)',
  zIndex: '100',
  top: 0,
  overflow: 'auto'
}
const show = {
  width: '55%',
  minHeight: '100%',
  margin: '0 auto',
  zIndex: '101',
  background: 'white'
}
const close = {
  position: 'absolute',
  width: '50px',
  height: '50px',
  right: '22.5%',
  color: 'black',
  textAlign: 'center',
  fontSize: '24px',
  borderRadius: '50px 50px',
  border: '1px solid black',
  cursor: 'pointer'
}
export default ArticleContent;