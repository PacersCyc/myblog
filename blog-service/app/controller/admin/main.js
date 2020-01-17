'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    this.ctx.body = 'admin'
  }

  async login() {
    let { userName, password } = this.ctx.request.body
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
      "' AND password = '" + password + "'"

    const res = await this.app.mysql.query(sql)
    if (res.length > 0) {
      let openId = new Date().getTime()
      this.ctx.session.openId = { openId }
      this.ctx.body = {
        data: '登录成功',
        openId
      }
    } else {
      this.ctx.body = { data: '登录失败' }
    }
  }

  async getTypes() {
    const res = await this.app.mysql.select('type')
    this.ctx.body = {
      data: res
    }
  }

  async addArticle() {
    let article = this.ctx.request.body
    const res = await this.app.mysql.insert('article', article)
    const insertSuccess = res.affectedRows === 1
    const insertId = res.insertId

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId
    }
  }

  async updateArticle() {
    let article = this.ctx.request.body
    const res = await this.app.mysql.update('article', article)
    const updateSuccess = res.affectedRows === 1

    this.ctx.body = {
      isSuccess: updateSuccess
    }
  }

  async getArticleList() {
    let sql = 'SELECT article.id as id,'+
                'article.title as title,'+
                'article.introduce as introduce,'+
                "FROM_UNIXTIME(article.create_time,'%Y-%m-%d' ) as create_time,"+
                'type.typeName as typeName '+
                'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                'ORDER BY article.id DESC '
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {
      list: res
    }
  }

  async deleteArticle() {
    let id = this.ctx.params.id
    const res = await this.app.mysql.delete('article', { id })
    this.ctx.body = {
      data: res
    }
  }

  async getArticleById() {
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.article_content as article_content,'+
    "FROM_UNIXTIME(article.create_time,'%Y-%m-%d' ) as create_time,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName ,'+
    'type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE article.id='+id
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: res
    }
  }
}

module.exports = AdminController
