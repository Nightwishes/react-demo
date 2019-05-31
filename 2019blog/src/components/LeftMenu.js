import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
export default () => (
  <Menu theme="light"
    defaultSelectedKeys={[window.location.hash.slice(1)]}
    mode="inline"
  >
    <Menu.Item key="/admin">
      <Link to="/admin"><Icon type="home"/>首页</Link>
    </Menu.Item>
    <Menu.Item key="/admin/article" title="文章管理">
      <Link to="/admin/article"><Icon type="file-markdown"/>文章管理</Link>
    </Menu.Item>
    <Menu.Item key="/admin/classify" title="smile">
      <Link to="/admin/classify"><Icon type="tags"/>分类管理</Link>
    </Menu.Item>
    <Menu.Item key="/admin/user">
      <Link to="/admin/user"><Icon type="user"/>用户管理</Link>
    </Menu.Item>
    <Menu.Item keu="admin/shouye">
      <Link to="/admin/shouye"><Icon type="home"/>首页管理</Link>
    </Menu.Item>
    <Menu.Item key="/">
      <Link to="/"><Icon type="logout"/>退出</Link>
    </Menu.Item>
  </Menu>
)