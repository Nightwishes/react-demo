import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Admin from './pages/admin';
import ShowArticle from './pages/showarticle';
// Switch只会渲染一个匹配上了就不会再匹配
export default class Routers extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/showarticle/:id" component={ShowArticle}/>
        </Switch>
      </Router>
    )
  }
}