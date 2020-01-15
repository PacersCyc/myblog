import React from 'react'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import Head from 'next/head'
import { Row, Col, Icon, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import '../static/style/pages/detail.scss'
import 'highlight.js/styles/monokai-sublime.css' // 引入特定主题的highlight样式文件

const Detail = (props) => {
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: (code) => {
      return hljs.highlightAuto(code).value
    }
  })

  let html = marked(props.article_content)
  const { title, view_count, create_time } = props

  return (
    <div>
      <Head>
        <title>Detail</title>
      </Head>
      <Header />

      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
        <Col className="common-right" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>xxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detail-title">{title}</div>
              <div className="list-icon center">
                <span><Icon type="calendar" /> {create_time}</span>
                <span><Icon type="fire" /> {view_count}</span>
              </div>
            </div>
            <div className="detail-content" dangerouslySetInnerHTML={{ __html: html }}></div>
          </div>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Detail.getInitialProps = async (ctx) => {
  let id = ctx.query.id
  const promise = new Promise((resolve, reject) => {
    axios(`${servicePath.getArticleDetail}${id}`).then(res => {
      resolve(res.data.data[0])
    })
  })
  return await promise
}

export default Detail
