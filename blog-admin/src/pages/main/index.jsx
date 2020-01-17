import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import AddArticle from '../addArticle'
import ArticleList from '../articleList'
import './style.scss'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

function Main(props) {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = collapsed => {
    console.log(collapsed)
    setCollapsed(collapsed)
  }

  const onArticleMenuClick = e => {
    console.log(e.key)
    switch (e.key) {
      case 'addArticle':
        props.history.push('/Main/add')
        break;
      case 'articleList':
        props.history.push('/Main/list')
        break;
      default:
        break;
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>添加文章</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            onClick={onArticleMenuClick}
            title={
              <span>
                <Icon type="user" />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>评论管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path="/Main" component={ArticleList} exact />
              <Route path="/Main/add" component={AddArticle} exact />
              <Route  path="/Main/add/:id" component={AddArticle} exact />
              <Route path="/Main/list" component={ArticleList} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default Main