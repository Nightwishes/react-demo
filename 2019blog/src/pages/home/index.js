import React, { Component } from 'react';
import { Form, Input, Icon, Button, message, Row, Col } from 'antd';
import { signup, signin } from '../../services/user';
import { getAllClassify } from '../../services/classify';
import { findOneArticleApi } from '../../services/article';
import marked from 'marked';
import { Link } from 'react-router-dom';
class NormalLoginForm extends React.Component {
    state = {
      formVisity: false,
      classifyList: [],
      menuVisity: true,
      _id: "5cda4ab38f1ee633170e73b3",
      content: ''
    }

    componentDidMount () {
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
      this.getShouye();
      getAllClassify().then(data => {
        let list = data.data;
        list = list.filter(item => {
          return item.name !== '首页'
        })
        this.setState({
          classifyList: list
        })
      })
    }
  handleSubmit = (regin, user) => {
    if (!regin) {
      signup(user).then(data => {
        if (data.code === 0 && !regin) {
          message.success("注册成功!");
        } else {
          message.error('注册失败!');
        }
      });  
    } else {
      (regin ? signin : signup)(user).then(res => {
      if (res.code === 0 && regin) {
        window.sessionStorage.setItem("userId", res.data)
        window.sessionStorage.setItem("userMessage", user.username);
        this.props.history.push('/admin');
      } else if (res.code === 0 && !regin) {
        message.success("登录成功!");
      } else if (res.code === 1 && regin) {
        message.error(res.error);
      }
    })
    }
  }
  // 控制表单是否显示
  show = () => {
    this.setState({
      formVisity: !this.state.formVisity,
    })
    if (this.state.formVisity) {
      this.getShouye();
    }
  }
  // 控制菜单栏显示与否
  menuShow = () => {
    this.setState({
      menuVisity: !this.state.menuVisity
    })
  }
  // 获取首页的文章
  getShouye = () => {
      findOneArticleApi(this.state._id).then(data => {
        const { content } = data.data;
        this.refs.shouyeShow.innerHTML = marked(content);
      })
  }
  render () {
    const { classifyList } = this.state;
    const menuItems = classifyList.map((item, i)=> (
        <Link 
        to={`/showarticle/${item._id}`} 
        key={item._id}>{item.name}
        </Link>
    ))
    return (
      <Row>
        <Col span={4}
        style={menu}
        >
        {
          this.state.menuVisity ? 
          <div
            className="homemenu"
          >
            {menuItems}
          </div> 
          
          : null
        }
        </Col>

        <Col span={20} style={{
          textAlign: 'center',
          marginTop: '2%'
        }}>
          <h1>markdown博客系统</h1>
        </Col>
          <div className="home-page">
            <Icon type="bars" className="bars" onClick={() => {this.menuShow()}}></Icon>
            <span
            onClick={() => {this.show()}}
            className="hanwen"
            >{this.state.formVisity ? '隐藏' : '登录'}</span>
            <div className="login-form">
              {
                this.state.formVisity ? < WrappedUserForm onSubmit = {
                  this.handleSubmit
                }
                /> : null
              }
          </div>
        </div>
        {
        this.state.formVisity  ? null :  <div style={shoye} ref="shouyeShow">
        </div> 
        }
        {/* <img src="http://localhost:7001/static/uploads/helloworld.jpg" alt="背景图" style={{position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, zIndex: -1, opacity: .8}}/> */}
      <div className="content">content</div>
      </Row>
    )
  }
}
class UserForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      reginIf: true
    }
  }
  checkUsername = (rule, value, callback) => {
    if (!value) {
      callback('用户名不能为空!');
    } else {
      callback();
    }
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={(e) => {
        e.preventDefault();
        this.props.onSubmit(
          this.state.reginIf,
          this.props.form.getFieldsValue()
        )
      }}>
        <Form.Item>
          {
            getFieldDecorator('username', {
              rules: [{validator: this.checkUsername},{required: true, message: 'please input your username'}],
            })(<Input prefix={<Icon type="user"/>} placeholder="username"/>)
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('password', {
              rules: [{validator: this.checkUsername},{required: true, message: 'please input your password'}],
            })(<Input prefix={<Icon type="lock"/>} type="password" placeholder="password"/>)
          }
        </Form.Item>
        {
          !this.state.reginIf ? <Form.Item>
          {
            getFieldDecorator('honey', {
              rules: [{validator: this.checkUsername},{required: true, message: '请输入昵称'}],
            })(<Input prefix={<Icon type="solution"/>} type="text" placeholder="honey"/>)
          }
          </Form.Item> : null
        }
        <Form.Item className="formLogin">
          <Button htmlType="submit" className="login-form-button">
            { this.state.reginIf ? '登录' : '注册' }
          </Button> 
          <span onClick={() => this.setState({reginIf: !this.state.reginIf})} className="forma">
          {!this.state.reginIf ? '已有账号,请登录' : '还未有账号请注册'}</span>
        </Form.Item>
      </Form>
    )
  }
}
const WrappedUserForm = Form.create({})(UserForm)
export default NormalLoginForm;

const menu = {
  zIndex: 1,
  marginTop: 80
}
const shoye = {
  width: 600,
  margin: '20px auto',
}