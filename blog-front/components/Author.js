import React from 'react'
import { Avatar, Divider } from 'antd'
import '../static/style/components/author.scss'

const Author = () => {
  return (
    <div className="author-wrapper common-box">
      <div>
        <Avatar 
          size={100}
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578936755652&di=9d3d3dace60c7e17e836c61c5ba5f527&imgtype=0&src=http%3A%2F%2Fimg08.mifile.cn%2Fv1%2FMI_55950AFBBEDCB%2FT16cATB_DT1RXrhCrK.jpg"
        />
      </div>
      <div className="author-intro">
        前端砖工，专业切图仔，被虐的路走的义无反顾
        <Divider></Divider>
        <Avatar size={28} icon="github" className="account" />
      </div>
    </div>
  )
}

export default Author