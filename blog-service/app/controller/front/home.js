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
             'article.create_time as create_time,'+
             'article.view_count as view_count ,'+
             '.type.typeName as typeName '+
             'FROM article LEFT JOIN type ON article.type_id = type.Id'
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: res
    }
  }
}

module.exports = HomeController;
