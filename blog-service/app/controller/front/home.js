'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.body = 'api';
  }

  async getArticleList() {
    let sql = 'SELECT article.id as id,'+
             'article.title as title,'+
             'article.introduce as introduce,'+
             "FROM_UNIXTIME(article.create_time,'%Y-%m-%d %H:%i:%s' ) as create_time,"+
             'article.view_count as view_count ,'+
             '.type.typeName as typeName '+
             'FROM article LEFT JOIN type ON article.type_id = type.Id'
    const res = await this.app.mysql.query(sql)
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
        "FROM_UNIXTIME(article.create_time,'%Y-%m-%d %H:%i:%s' ) as create_time,"+
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

module.exports = HomeController;
