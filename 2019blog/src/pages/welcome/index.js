import React, { Component } from 'react';
import { findOneArticleApi } from '../../services/article';
import marked from 'marked';
class Welcome extends Component {
  state = {
    id: '5cda4ab38f1ee633170e73b3',
    content: ''

  }
  componentDidMount () {
    findOneArticleApi(this.state.id).then(data => {
      const { content } = data.data;
      this.setState({
        content
      })
      this.refs.showBox.innerHTML = marked(this.state.content)
    });
    
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
  }
  render () {
    return (
      <div ref="showBox"></div>
    )
  }
}
export default Welcome;