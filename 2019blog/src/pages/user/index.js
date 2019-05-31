import React, { Component } from 'react';
import { List, Button, Icon, Row, Col, Form, Input, Modal, message, Avatar, Popconfirm} from 'antd';
import { createUser, getAllUser, delUserApi, updateUserApi } from '../../services/user';
import { defaultAvatar, pageSize } from './Avatar.config';
import UserAvatar from '../../components/Avatar'
class User extends Component {
  state = {
    isCreating: false,
    userVisity: false,
    dataList: [],
    data: [],
    initLoading: false,
    loading: false,
    pageNum: 0,
    item: {},
    hiddenMore: false
  }
  componentDidMount () {
    this.getList().then(data => {
      if (!data.code) {
        console.log(data.data);
        this.setState({
          initLoading: false,
          dataList: data.data.list,
          data: data.data.list
        })
      }
    })
  }
  createUser = () => {
    this.setState({
      userVisity: true,
      isCreating: true
    })
  }
  closeMadal = () => {
    this.setState({
      userVisity: false
    })
  }
  handleUser = () => {
    const data = this.userEditor.props.form.getFieldsValue();
    let postUser = this.state.isCreating ? createUser(data) : updateUserApi(this.state.item._id, data);
    postUser.then(data => {
      if (!data.code && this.state.isCreating) {
        message.success('创建成功!');
        this.setState({
          userVisity: false,
          pageNum: 0,
          hiddenMore: false
        })
      this.getList().then(data => {
        if (!data.code) {
          this.setState({
            initLoading: false,
            dataList: data.data.list,
            data: data.data.list
          })
        }
      })
      } else if (!data.code && !this.state.isCreating) {
        message.success('修改成功!');
        this.setState({
          pageNum: 0,
          userVisity: false,
          hiddenMore: false
        })
        this.getList().then(data => {
          if (!data.code) {
            this.setState({
              initLoading: false,
              dataList: data.data.list,
              data: data.data.list
            })
          }
        })
      }
      else {
        message.error('创建用户失败！');
      }
    })
  }
  getList = () => {
    let pageNum = this.state.pageNum + 1;
    this.setState({
      pageNum: this.state.pageNum + 1
    })
    return getAllUser({pageNum, pageSize})
  }
  // 删除用户
  delUser = (id) => {
    delUserApi(id).then(data => {
      if (!data.code) {
        message.success('删除用户成功!');
        this.setState({
          dataList: this.state.dataList.filter(item => item._id !== id),
          data: this.state.data.filter(item => item._id !== id)
        })
      }
    })
  }
  // 修改用户
  putUser = (item) => {
    this.setState({
      isCreating: false,
      userVisity: true,
      item
    })
  }
  // 
  onLoadMore = () => {
    this.setState({
      loading: true,
      dataList: this.state.dataList.concat([...new Array(this.state.pageNum)].map(() => ({loading: true})))
    })
    this.getList().then(data => {
      if (!data.code && !data.data.list.length) {
        message.error('已无更多用户!');
        this.setState({
          hiddenMore: true
        })
      }
      if (!data.code) {
        const concatdata = this.state.data.concat(data.data.list);
        this.setState({
          data: concatdata,
          dataList: concatdata,
          loading: false
        }, () => {
          window.dispatchEvent(new Event('resize'));
          console.log(this.state.initLoading, this.state.loading);
        })
      }
    })
  }
  render () {
    const { initLoading, loading, hiddenMore } = this.state;
    const loadMore = !initLoading && !loading && !hiddenMore ? (
    <div style={{
      textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
    }}
    >
      <Button onClick={this.onLoadMore}>loading more</Button>
    </div>
  ) : null;
    return (
      <div>
        <Row>
          <Col span={3}>
            <Button type="primary"
            style={{margin: 15}}
             onClick={() => {this.createUser()}}>
             添加一个用户<Icon type="plus"/></Button>
          </Col>
        </Row>
        <Row  className="user-list">
          <Col span={12}>
              <List
              className="loadmore-list"
              dataSource={this.state.dataList}
              loadMore={loadMore}
              loading={initLoading}
              itemLayout = "horizontal"
              renderItem={item => (
              
              <List.Item
              key={item._id}
              actions={[
              <Popconfirm onConfirm={() => this.delUser(item._id)} 
              okText="确定" 
              cancelText="取消" 
              title="你确定删除此用户么?">
              <span>删除用户</span>
              </Popconfirm>
              , 
              <span
              onClick={() => {this.putUser(item)}}
              >修改用户</span>
            ]}
                >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar ? item.avatar : defaultAvatar}  size={90}/>}
                  title= {item.username}
                  description={item.honey}
                />  
                </List.Item>
              )}
            />
          </Col>
        </Row>
        <Modal
          visible={this.state.userVisity}
          title={this.state.isCreating ? '创建用户' : '修改用户'}
          destroyOnClose
          centered
          onCancel={this.closeMadal}
          onOk={this.handleUser}
        >
          <WrappedUserForm
          isCreating={this.state.isCreating}
          item={this.state.item}
          wrappedComponentRef={inst => this.userEditor = inst}/>
          {
            !this.state.isCreating 
            ? <UserAvatar 
            id={this.state.item._id} 
            item={this.state.item}
            style={{width: 80, height: 80}}/> 
            : null
          }
        </Modal>
      </div>
    )
  }
}
class UserForm extends Component {
  render () {
    const { isCreating, item } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item>
          {
            getFieldDecorator('username', {
              rules: [{required: true, message: '3-11长度用户名', max: 11, min: 3}],
              initialValue: isCreating ? '' : item.username
            })(<Input placeholder="请输入长度用户名"/>)
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('password', {
              rules: [{required: true, message: '8-15位数密码', max: 20, min: 8}],
              initialValue: isCreating ? '' : item.password
            })(<Input placeholder="请输入密码!"/>)
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('honey', {
              rules: [{required: true, message: '昵称ya'}],
              initialValue: isCreating ? '' : item.honey
            })(<Input placeholder="请输入昵称"/>)
          }
        </Form.Item>
      </Form>
    )
  }
}
const WrappedUserForm = Form.create()(UserForm);
export default User;