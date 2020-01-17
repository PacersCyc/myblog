import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Input, Icon, Button, Spin, message } from 'antd'
import servicePath from '../../config/apiUrl'
import './style.scss'

function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const login = () => {
    if (!username) {
      return message.error('用户名不能为空')
    }
    if (!password) {
      return message.error('密码不能为空')
    }
    setIsLoading(true)
    let params = {
      userName: username,
      password
    }
    axios({
      method: 'post',
      url: servicePath.login,
      data: params,
      withCredentials: true
    }).then(res => {
      setIsLoading(false)
      if (res.data.data === '登录成功') {
        localStorage.setItem('openId', res.data.openId)
        props.history.push('/Main')
      } else {
        message.error('用户名或密码错误')
      }
    })
  }

  return (
    <div className="login-wrapper">
      <Spin tip="loading..." spinning={isLoading}>
        <Card 
          title="CYC博客后台管理系统" 
          bordered
          style={{
            width: 400
          }}
        >
          <Input
            style={{
              marginBottom: 10
            }}
            size="large"
            placeholder="用户名"
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
            value={username}
            onChange={e => {
              setUsername(e.target.value)
            }}
          />
          <Input.Password 
            style={{
              marginBottom: 10
            }}
            size="large"
            placeholder="密码"
            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
            value={password}
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          <Button
            type="primary"
            size="large"
            block
            onClick={login}
          >
            登录
          </Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login