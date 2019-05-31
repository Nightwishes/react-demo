import React, { Component } from 'react';
import { Row, Col, Table, Form, Button, Input, Modal, message, Popconfirm } from 'antd';
import { createClassify, getClassifyList, putClassify, delClassify } from '../../services/classify'
class Classify extends Component {
  state = {
    editorVisible: false,
    isCreating: false,
    list: {},
    lists: [],
    pagination: {},
    selectedRowKeys: []
  }
  componentDidMount () {
    this.getList();
  }
  // 获取分页的数据
  getList = (pageNum = 1, pageSize = 5) => {
    getClassifyList({pageNum, pageSize}).then(data => {
      const { list, pageNum, pageSize, count } = data.data;
      this.setState({
        lists: list,
        pagination: {
          current: pageNum,
          pageSize,
          count,
          total: count,
          showTotal: count => `总计${count}条`,
          onChange: this.pageChange,
          showQuickJumper: true
        }
      })
    })
  }
  // 分页点击获取数据
  pageChange = (page) => {
    this.getList(page);
  }
  handleCancel = () => {
    this.setState({
      editorVisible: false
    })
  }
  handleOk = () => {
    let classify = this.editorForm.props.form.getFieldsValue();
    let postData = this.state.isCreating ? createClassify(classify) : putClassify(this.state.list._id, classify);
    postData.then(data => {
      if (!data.code) {
        let alertText = this.state.isCreating ? '添加成功!' : '修改成功!';
        let page = this.state.isCreating ? (Math.ceil((this.state.pagination.count + 1) / this.state.pagination.pageSize)) : this.state.pagination.current;
        message.success(alertText);
        let timer = setTimeout(() => {
          this.getList(Math.ceil(page));
          clearTimeout(timer);
        }, 30);
      } else {
        message.error(data.error);
      }
    })
    this.setState({
      editorVisible: false
    })
  }
  handleCreate = () => {
    this.setState({
      isCreating: true,
      editorVisible: true
    })
  }
  classUpdate = (row) => {
    this.setState({
      isCreating: false,
      list: row,
      editorVisible: true
    })
  }
  classifyDel = (id) => {
    console.log(id);
    let postDel = this.state.selectedRowKeys.length ? delClassify(this.state.selectedRowKeys[0], this.state.selectedRowKeys) : delClassify(id);
    postDel.then(data => {
      if (!data.code) {
        message.success('删除成功!');
        this.getList(this.state.pagination.current);
      } else {
        message.error('删除失败!');
      }
    })
  }
  render () {
    const columns = [
      {
        title: '分类',
        dataIndex: 'name',
        key: 'name',
        align: 'center'
      },
      {
        title: '喜欢的句子',
        dataIndex: 'smile',
        key: 'smile',
        align: 'center'
      },
      {
        title: '操作',
        dataIndex: 'caozuo',
        key: 'caozuo',
        align: 'center',
        render: (value, row, index) => {
          return (
            <div>
              <span style={{marginRight: 10}} onClick={() => {this.classUpdate(row)}}>修改</span>
              <Popconfirm title={'确定删除分类吗?'} okText={'确定'} cancelText={'取消'} onConfirm={() => {this.classifyDel(row._id)}}>
                <span>删除</span>
              </Popconfirm>
            </div>
          )
        }
      }
    ]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys
        })
      }
    };
    return (
      <div>
        <Row style={{display:'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
          <Col span={6}>
            <Button.Group>
              <Button 
              type="primary" 
              icon="plus" 
              style={{margin: 15}}
              onClick={() => {this.handleCreate()}}
              >添加分类</Button>
              <Button type="danger" icon="minus" onClick={() => {this.classifyDel(this.state.selectedRowKeys)}}>删除所选分类</Button>
            </Button.Group>
          </Col>
        </Row>
        <Row>
          <Table
            columns={columns}
            dataSource={this.state.lists}
            pagination={this.state.pagination}
            rowKey="_id"
            rowSelection={rowSelection}
          />
        </Row>
        <Modal
          visible = {this.state.editorVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered
          destroyOnClose
          title={this.state.isCreating ? '添加分类' : '修改分类'}
        >
          < WrappedEditorForm
            isCreating={this.state.isCreating}
            list={this.state.list}
            wrappedComponentRef={inst => this.editorForm = inst}
          />
        </Modal>
      </div>
    )
  }
}
class EditorForm extends Component {
  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item
        label="分类名"
        >
          {
            getFieldDecorator('name', {
              rules: [{required: true, message: '请输入分类'}],
              initialValue: this.props.isCreating ? '' : this.props.list.name
            })(<Input placeholder="请输入分类"/>)
          }
        </Form.Item>
        <Form.Item
        label="说一句很酷的话"
        >
          {
            getFieldDecorator('smile', {
              rules: [{required: true, message: "说一句你喜欢的名言吗"}],
              initialValue: this.props.isCreating ? '' : this.props.list.smile
            })(<Input placeholder="请说一句你喜欢的名言警句吧~"/>)
          }
        </Form.Item>
      </Form>
    )
  }
}
const WrappedEditorForm = Form.create()(EditorForm);
export default Classify;