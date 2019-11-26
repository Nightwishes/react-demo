import  React, { Component } from 'react';
import { Row, Col, } from 'antd';
import { Route } from 'react-router-dom';
import Header from '../../components/Header';
import Welcome from '../welcome';
import Article from '../article';
import Classify from '../classify';
import LeftMenu from '../../components/LeftMenu';
import User from '../user';
import Shouye from "../shouye";
// import Shouye from '../shouye';
import { withRouter } from 'react-router-dom';
class Admin extends Component {
  render () {
    return (
      <div>
        <Row className="firstRow">
          <Col span={24}>
            <Header/>
            <Row>
                <Col span={4}>
                <LeftMenu/>
              </Col>
              <Col span={20}>
                  <Route path="/admin" exact component={Welcome}/>
                  <Route path="/admin/article" component={Article}/>
                  <Route path="/admin/classify" component={Classify}/>
                  <Route path="/admin/user" component={User}/>
                  <Route path="/admin/shouye" component={Shouye}/>
              </Col>
            </Row>
          </Col>
        </Row>    
      </div>
    )
  }
}
export default withRouter(Admin);