import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List, Row, Col, Modal, message, Button } from 'antd'
import servicePath from '../../config/apiUrl'
import './style.scss'

const { confirm } = Modal

function ArticleList(props) {
  const [list, setList] = useState([])

  const updateArticle = (id) => {
    props.history.push(`/Main/add/${id}`)
  }

  const deleteArticle = (id) => {
    confirm({
      title: '确定删除文章吗',
      content: '删除后无法恢复',
      onOk() {
        axios({
          method: 'delete',
          url: servicePath.deleteArticle + id,
          withCredentials: true
        }).then(res => {
          message.success('文章删除成功')
          getList()
        })
      }
    })
  }

  const getList = () => {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true,
      header: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      setList(res.data.list)
    })
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>
                {item.title}
              </Col>
              <Col span={4}>
                {item.typeName}
              </Col>
              <Col span={4}>
                {item.create_time}
              </Col>
              <Col span={4}>
                {item.view_count}
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={() => updateArticle(item.id)}>修改</Button>
                <Button type="danger" onClick={() => deleteArticle(item.id)}>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ArticleList