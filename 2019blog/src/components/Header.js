import React, { Component } from 'react';
import { Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { signout } from '../services/user';
import { findOneUser }  from '../services/user';
class Header extends Component {
  state = {
    avatar: '',
    honey: ''
  }
  handleClose = () => {
    signout().then(data => {
      if (!data.code) {
        console.log('退出成功!');
      }
    })
  }
  // 从sessionStore获取ID拿到用户昵称
  componentDidMount () {
    findOneUser(window.sessionStorage.getItem('userId')).then(data => {
      if (!data.code) {
        this.setState({
          honey: data.data.honey,
          avatar: data.data.avatar
        })
      }
    })
  }
  render () {
    return (
      <div className="header">
        <div className="wrapper">
          <Avatar src={this.state.avatar} className="avatar"/>
          <h1>你回来了,{this.state.honey}</h1>
        </div>
        <Link to="/">
        <Icon type="close" onClick={() => {this.handleClose()}} 
        style={{marginRight: 30, fontSize: 30, fontWeight: 700}}/>
        </Link>
      </div>
    )
  }
}
export default Header;