import React, { Component } from 'react';
import { Table, Row, Col, Input, Button, Popconfirm, message, Modal, Form, Icon, Select, List, Avatar } from 'antd';
import { getArticleList, createArticle, putArticle, delArticle, addCommnent, delCommnetApi, findOneArticleApi } from '../../services/article';
import { getAllClassify } from '../../services/classify';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import ReadMe from '../../components/ReadmeEditor';
require('moment/locale/zh-cn');
class Article extends Component {
  state = {
    lists: [],
    pagination: {},
    editorVisible: false,
    commnentVisible: false,
    isCreating: false,
    item: {},
    selectedRowKeys: [],
    // 关键字查找
    keyWord: '',
    // 类型
    classify: []
  }
  componentDidMount () {
    this.getList();
    this.getClassify();
  }
  //开始执行添加操作
  create = () => {
    this.setState({
      editorVisible: true,
      isCreating: true,
      item: {}
    })
  }
  // 传给分液器变化的回调
  pageChange = (pageNum) => {
    this.getList(pageNum);
  }
  // 获取表格数据
  getList = (pageNum = 1, keyWord = '') => {
    getArticleList({
      pageNum,
      pageSize: this.state.pagination.pageSize,
      keyWord
    }).then(data => {
      const { pageNum, pageSize, count } = data.data;
      this.setState({
        lists: data.data.list,
        pagination: {
          current: pageNum,
          pageSize,
          count, 
          showTotal: count => `总计${count}条`,
          showQuickJumper: true,
          total: count,
          onChange: this.pageChange
        }
      })
    })
  };
    getColumnSearchProps = (dataIndex) => ({ 
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          寻找
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          清空
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }
  // 点击确定后添加修改
  handleOk = (e) => {
    let article = this.editorform.props.form.getFieldsValue();
    article.user = sessionStorage.getItem('userId');
    article.content = this.editorReadMe.smde.value();
    console.log(article);
    let service = this.state.isCreating ? createArticle(article) : putArticle(this.state.item._id, article);
    service.then(data => {
      if (!data.code) {
        let page;
        let createPage = Math.ceil((this.state.pagination.count + 1) / this.state.pagination.pageSize);
        page = this.state.isCreating ? createPage : this.state.pagination.current; 
        this.setState({
          editorVisible: false
        }, this.getList(page))
      } else {
        message.error(data.error);
      }
    })
  }
  handleCancel = (e) => {
    this.setState({
      editorVisible: false
    })
  }
  editor = (item) => {
    this.setState({
      item,
      isCreating: false,
      editorVisible: true,
    })
  }
  // 删除操作
  del = (data) => {
    let service = typeof data == 'object' ? delArticle(data[0], data) : delArticle(data);
    service.then(data => {
      if (!data.code) {
        this.getList(this.state.pagination.current);
      }
    }) 
  }
  // 选择变化时
  onselectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys
    })
  }
  getClassify = () => {
    getAllClassify().then(data => {
      if (!data.code) {
        this.setState({
          classify: data.data
        })
      }
    })
  }
  // 评论框
  commnentClick = (item) => {
    this.setState({
      commnentVisible: true,
      item
    })
  }
  // 关闭评论框
  commnentClose = () => {
    this.setState({
      commnentVisible: false
    })
  }
  // 重新获取文章 传给articleList组件
  doubleArticle = () => {
    return findOneArticleApi(this.state.item._id);
  }
  // 提交评论
  commnetHandle = () => {
    const data = this.commnetEditor.props.form.getFieldsValue();
    addCommnent(this.state.item._id, data).then(data => {
      if (!data.code) {
        message.success("添加评论成功!");
        this.getList(this.state.pagination.current);
        this.doubleArticle().then(data => {
          this.setState({
            item: data.data
          })
        })
      } else {
        message.error('添加评论失败!');
      }
    })
  }
  // 删除评论
  delComment = (id) => {
    delCommnetApi(this.state.item._id, id).then(data => {
      if (!data.code) {
        this.getList(this.state.pagination.current);
        this.doubleArticle().then(data => {
          this.setState({
            item: data.data
          })
        })
      } else {
        message.error('删除评论失败!');
      }
    })
  }
  render () {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      ...this.getColumnSearchProps('title')
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      align: 'center',
      width: '20%',
      ...this.getColumnSearchProps('content'),
      textWrap: 'ellipsis',
      render: (text, record) => (
        <div style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>
          {text}
        </div>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'center',
      render: (text) => moment(text).fromNow()
    },{
      title: '阅读量',
      dataIndex: 'pv',
      key: 'pv',
      align: 'center'
    },
    {
      title: '类型',
      dataIndex: 'classify.name',
      key: 'classify',
      align: 'center'
    },
    {
      title: '作者',
      dataIndex: 'user.username',
      key: 'user',
      align: 'center'
    },
    {
      title: '评论数',
      dataIndex: 'comments',
      key: 'comments',
      align: 'center',
      render: (text) => text.length
    },
    {
      title: '操作',
      dataIndex: 'Done',
      render: (value, row, index) => {
        return (
          <div>
            <span style={{marginRight: 20}} onClick = {() => this.editor(row)}>修改</span>
            <Popconfirm title="你确定要删除吗?" okText="是的" cancelText="不是" onConfirm={() => this.del(row._id)}>
              <span>删除</span>
            </Popconfirm>
            <span style={{marginLeft: 20}} onClick={() => {this.commnentClick(row)}}>评论</span>
          </div>
        )
      },
      align: 'center',
      colSpan: 1
    },
  ]
  const rowSelection = {
    selectedRowKeys: this.state.selectedRowKeys,
    onChange: this.onselectChange
  }  
    return (
      <div>
        <Row>
          <Col span={8} style={{marginBottom: 5}}>
            <Button.Group>
              <Button type="primary" onClick={this.create}>新增文章</Button>
              <Popconfirm 
              onConfirm={() => {this.del(this.state.selectedRowKeys)}}
              cancelText="取消"
              okText="确定"
              title="你确定删除所选文章么？"
              >
                <Button type="danger">删除所选文章</Button>
              </Popconfirm>
            </Button.Group>
          </Col>
          <Col span={16}
          style={{width:300}}
          >
            <Input.Search
              enterButton
              onSearch={value => this.setState({
                keyWord: value
              }, this.getList(1, this.state.pagination.pageSize, this.state.keyWord))}
            />
          </Col>
        </Row>
        <Row>
          <Table 
          bordered
          rowKey='_id'
          dataSource={this.state.lists}
          columns={columns}
          rowSelection={rowSelection}
          pagination={this.state.pagination}
          />
          <Modal
          title={this.state.isCreating ? '新增文章' : '修改文章'}
          visible = {this.state.editorVisible}
          onOk={this.handleOk}
          width='60%'
          onCancel={this.handleCancel}
          // 这个属性每次都会清空Modal重新渲染 为了性能
          destroyOnClose
          ref={inst => this.articleModal = inst}
          >
            < WrappedEditorMadal
            wrappedComponentRef={inst => this.editorform = inst}
            isCreating={this.state.isCreating}
            item={this.state.item}
            classify={this.state.classify}
            />
            <ReadMe ref={inst => this.editorReadMe = inst}
              readMeinitial={this.state.item.content}
            />
          </Modal>
        </Row>
        <Modal
        title={this.state.item.title + '的评论'}
        visible={this.state.commnentVisible}
        onCancel={this.commnentClose}
        footer={false}
        centered
        width={900}
        >
        <Row style={{display: 'flex', justifyContent: 'space-around'}}>
          <Col style={{width: '60%'}}>
            <WrappedCommnentForm wrappedComponentRef={inst => this.commnetEditor = inst}
            destroyOnClose
            />
          </Col>
          <Col>
              <Button style={{height: 32, marginTop: 3}}
              type="primary"
              onClick={() => {this.commnetHandle()}}
              ><Icon type="edit"/>提交评论</Button>
          </Col>
        </Row>
        <CommnentLists 
        comments={this.state.item.comments}
        delComment={this.delComment}
        doubleArticle={this.doubleArticle}
        />
        </Modal>
      </div>
    )
  }
} 
class EditorMadal extends Component {
  render () {
    const { getFieldDecorator }  = this.props.form;
    return (
      <Form>
        <Form.Item>
          {
            getFieldDecorator('title', {
              rules: [{required: true, message: "请输入标题名称"}],
              initialValue: this.props.isCreating ? '' : this.props.item.title
            })(<Input placeholder="请输入标题名称"/>)
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('classify', {
              initialValue: this.props.classify[0]._id,
              rules: [{required: true, message: "请选择文章的类型"}],
            })(
              <Select placeholder="请选择一种类型">
                  {
                    this.props.classify.map(item => (
                      <Select.Option key={item._id} value={item._id}>
                        {item.name}
                      </Select.Option>
                    ))
                  }
              </Select>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}
// 渲染评论List的函数组件
 class CommnentLists extends Component {
   componentDidMount () {
     console.log(this.props.comments);
   }
   state = {
      initLoading: true,
      loading: false,
      data: this.props.comments,
      list: this.props.comments
   }
    render () {
      return (
        <Row>
          <Col span={24}>
            <List
            dataSource={this.props.comments}
            renderItem={item => (
              <List.Item
              key={item._id}
              extra={
                <Button type="danger" onClick={() => {this.props.delComment(item._id)}}>删除评论</Button>
              }
              >
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.content}
              />
              </List.Item>
            )}
            />
          </Col>
        </Row>
        )
    }
  }
class CommnentForm extends Component {
  state = {};
  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item>
          {
            getFieldDecorator('content', {
              rules: [{required: true, message: "请输入评论内容"}],
            })(<Input placeholder="请输入评论内容"/>)
          }
        </Form.Item>
      </Form>
    )
  }

}
const WrappedCommnentForm = Form.create()(CommnentForm);
const WrappedEditorMadal = Form.create()(EditorMadal);
export default Article;