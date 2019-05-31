import React, { Component } from 'react';
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';
import marked from 'marked';
import highlight from 'highlight.js';

class ReadmeEditor extends Component {
  state = {
    editorId: 'readme'
  }

  componentDidMount () {
    this.smde = new SimpleMDE(
      {
        element: document.getElementById(this.state.editorId).childElementCount,
        autosave: true,
        placeholder: '嗨！朋友........如果是你轻挥挥手.....',
        initialValue: this.props.readMeinitial ? this.props.readMeinitial : '',
        previewRender: function (plainText) {
          return marked(plainText, {
          renderer: new marked.Renderer(),
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: true,
            smartLists: true,
            smartypants: true,
            highlight: function (code) {
              return highlight.highlightAuto(code).value;
            }
         })
        }
      }
    )
    console.log(this.smde);
  } 
  render () {
    return (
      <textarea id={this.state.editorId}></textarea>
    )
  }
}
export default ReadmeEditor;