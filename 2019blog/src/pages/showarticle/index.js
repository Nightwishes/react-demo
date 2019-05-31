import React, { Component } from 'react';
import { Row, Col, List, Avatar, Icon,Button, message } from 'antd';
import { getArticleList } from '../../services/article';
import ArticleCotent from '../showarticle/articleContent';
import moment from 'moment';
require('moment/locale/zh-cn');
class ShowArticle extends Component {
  state = {
    dataList: [],
    title: '',
    item: {},
    showOneArticle: false,
    initLoading: true,
    loading: false,
    data: [],
    des: '',
    pageNum: 1,
    pageSize: 5,
    show: true,
    count: ''
  };
  componentDidMount () {
    let id = this.props.match.params.id;
    getArticleList({
      pageNum : this.state.pageNum,
      pageSize : this.state.pageSize,
      keyWord : '',
      classifyId: id
    }).then(data => {
      let { list } = data.data;
      let title = list[0].classify.name;
      let des = list[0].classify.smile;
      let count = data.data.count;
      this.setState({
        dataList: list ,
        title,
        initLoading: false,
        des,
        count
      })
    }, (error) => {
      console.log(error)
    })
  }
  getArticle = (item) => {
    this.setState({
      showOneArticle: true,
      item
    })
  }
  closeArticle = () => {
    this.setState({
      showOneArticle: false
    })
  }
  backHome = () => {
    this.props.history.push('/');
  }
  onLoadMore = () =>{
    this.setState({
      loading: true,
      list: this.state.dataList.concat([...new Array(this.state.pageSize)].map(() => ({loading: true})))
    })
    getArticleList({
      pageNum: this.state.pageNum + 1,
      pageSize: this.state.pageSize,
      keyWord: '',
      classifyId: this.props.match.params.id
    }).then(data => {
      const { list } = data.data;
      if (!list.length) {
        message.error('已无更多文章');
        this.setState({
          show: false
        })
      }
      const dataArray = this.state.dataList.concat(list);
      console.log(dataArray);
      this.setState({
        dataList: dataArray,
        data: dataArray,
        loading: false,
        pageNum: this.state.pageNum + 1
      }, () => {
        window.dispatchEvent(new Event('resize'));
      })
    })
  }
  render () {
    const { title, dataList, showOneArticle, item, loading, initLoading , des, show } = this.state;
    const loadMore = !initLoading && !loading && show ? (
      <div style={{
        textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
      }}
      >
        <Button onClick={() => {this.onLoadMore()}}>more</Button>
      </div>
    ) : null;
    return (
    <div>
      <Row style={{display:'flex', justifyItems:'center'}}>
        <Col span={1}>
          <span
          onClick={() => {this.backHome()}}
          ><Icon type="left" style={{fontSize: 24, margin: 50}}/></span>
        </Col>
        <Col span={23}>
        <h1 style={{textAlign:'center', marginTop: 50}}>{title}{`(${this.state.count})`}</h1>
        </Col>
        </Row>
        <Row style={{display: 'flex', justifyContent: 'center'}}>
          <Col span={12}>
            <List
            dataSource={dataList}
            size="large"
            style={{padding: 30, fontWeight: 700}}
            itemLayout="horizontal"
            loadMore={loadMore}
            loading={initLoading}
            header={<div style={{fontWeight: 700, fontSize: 22}}>{des ? des : '生命中最善良的时光就像水一样明亮...'}</div>}
            renderItem={item => (
              <List.Item
               key={item._id}
              onClick={() => {this.getArticle(item)}}
              >
                <List.Item.Meta
                avatar={<Avatar src={item.user.avatar} size={64} shape="square"/>}
                title={<span style={{fontSize: 24,}}>{item.title}</span>}
                description={<div>{item.user.username} {moment(item.createAt).fromNow()}</div>}
                />
                {item.content}
              </List.Item>
            )}
            />
          </Col>
        </Row>
        {
          showOneArticle ? <ArticleCotent item={item} closeArticle = {this.closeArticle}/> : null
        }
      </div>
    )
  }
}

export default ShowArticle;