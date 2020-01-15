import React, { useState } from 'react'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Icon } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import '../static/style/pages/index.scss'
import 'highlight.js/styles/monokai-sublime.css'

const Home = (articleList) => {
  const [list, setList] = useState(articleList.data)
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

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />

      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
        <Col className="common-right" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>我的搬砖记录</div>}
            itemLayout="vertical"
            dataSource={list}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detail', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span>
                    <Icon type="calendar" />
                    {item.create_time}
                  </span>
                  <span>
                    <Icon type="fire" />
                    {item.view_count}
                  </span>
                </div>
                <div className="list-context" dangerouslySetInnerHTML={{__html: item.introduce}}></div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve, reject) => {
    axios(servicePath.getArticleList).then(res => {
      console.log(res.data.data)
      resolve(res.data)
    })
  })
  return await promise
}

export default Home
