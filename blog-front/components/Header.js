import React from 'react'
import { Row, Col, Menu, Icon } from 'antd'
import '../static/style/components/header.scss'

const Header = () => {
  return (
    <div className="header-wrapper">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <img src="/static/img/logo.jpeg" className="header-logo" />
          <span className="header-text">CYC的博客</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6} style={{textAlign: 'right'}}>
          <Menu mode="horizontal">
            <Menu.Item key="home">
              <Icon type="home" />
              首页
          </Menu.Item>
            <Menu.Item key="about">
              <Icon type="user" />
              关于
          </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header