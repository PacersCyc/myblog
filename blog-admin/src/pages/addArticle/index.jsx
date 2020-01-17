import React, { useState, useEffect } from 'react'
import axios from 'axios'
import marked from 'marked'
import { Button, Row, Col, Input, Select, DatePicker, message } from 'antd'
import servicePath from '../../config/apiUrl'

import './style.scss'

const { Option } = Select
const { TextArea } = Input

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState(1) //选择的文章类别

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  })

  const getArticleDetail = (id) => {
    axios({
      method: 'get',
      url: servicePath.getArticleById + id,
      withCredentials: true,
      header: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      let article = res.data.data[0]
      setArticleTitle(article.title)
      setArticleContent(article.article_content)
      let contentHtml = marked(article.article_content)
      setMarkdownContent(contentHtml)
      setIntroducemd(article.introduce)
      let introHtml = marked(article.introduce)
      setIntroducehtml(introHtml)
      setShowDate(article.create_time)
      setSelectType(article.typeId)
    })
  }

  const onTitleChange = e => {
    setArticleTitle(e.target.value)
  }

  const onContentChange = e => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const onIntroduceChange = e => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  const onSelectChange = val => {
    setSelectType(val)
  }

  const onDateChange = (date, dateString) => {
    setShowDate(dateString)
  }

  const saveArticle = () => {
    if (!selectedType) {
      return message.error('请选择文章类型')
    }
    if (!articleTitle) {
      return message.error('文章名称不能为空')
    }
    if (!articleContent) {
      return message.error('文章内容不能为空')
    }
    if (!introducemd) {
      return message.error('文章简介不能为空')
    }
    if (!showDate) {
      return message.error('发布日期不能为空')
    }
    
    let params = {
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      introduce: introducemd,
      create_time: (new Date(showDate.replace('-', '/')).getTime())/1000
    }
    if (articleId === 0) {
      params.view_count = 0
      axios({
        method: 'post',
        url: servicePath.addArticle,
        data: params,
        withCredentials: true
      }).then(res => {
        setArticleId(res.data.insertId)
        if (res.data.isSuccess) {
          message.success('文章保存成功')
        } else {
          message.error('文章保存失败')
        }
      })
    } else {
      params.id = articleId
      axios({
        method: 'put',
        url: servicePath.updateArticle,
        data: params,
        withCredentials: true
      }).then(res => {
        if (res.data.isSuccess) {
          message.success('文章更新成功')
        } else {
          message.error('文章更新失败')
        }
      })
    }
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: servicePath.getTypes,
      withCredentials: true
    }).then(res => {
      if (res.data.data === '未登录') {
        localStorage.removeItem('openId')
        props.history.push('/')
      } else {
        setTypeInfo(res.data.data)
      }
    })

    let id = props.match.params.id
    if (id) {
      setArticleId(id)
      getArticleDetail(id)
    }
  }, [])

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10} style={{ marginBottom: 12 }}>
            <Col span={20}>
              <Input
                placeholder="文章标题"
                size="large"
                value={articleTitle}
                onChange={onTitleChange}
              />
            </Col>
            <Col span={4}>
              <Select
                placeholder="请选择文章类别"
                defaultValue={selectedType}
                size="large"
                onChange={onSelectChange}
              >
                {
                  typeInfo.map(type => (
                    <Option key={type.id} value={type.id}>{type.typeName}</Option>
                  ))
                }
              </Select>
            </Col>
          </Row>

          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                value={articleContent}
                onChange={onContentChange}
              />
            </Col>
            <Col span={12}>
              <div className="show-html" dangerouslySetInnerHTML={{ __html: markdownContent }}></div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24} style={{ marginBottom: 10 }}>
              <Button
                style={{ marginRight: 8 }}
                size="large"
              >
                暂存文章
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={saveArticle}
              >
                发布文章
              </Button>
            </Col>

            <Col span={24}>
              <TextArea
                style={{ marginBottom: 10 }}
                rows={4}
                placeholder="文章简介"
                value={introducemd}
                onChange={onIntroduceChange}
              />
              <div className="introduce-html" dangerouslySetInnerHTML={{ __html: introducehtml }}></div>
            </Col>

            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                  onChange={onDateChange}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle