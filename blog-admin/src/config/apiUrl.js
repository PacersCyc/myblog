let baseUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
  login: `${baseUrl}login`,
  getTypes: `${baseUrl}types`,
  addArticle: `${baseUrl}article`,
  updateArticle: `${baseUrl}article`,
  getArticleList: `${baseUrl}articleList`,
  deleteArticle: `${baseUrl}article/`,
  getArticleById: `${baseUrl}article/`
}

module.exports = servicePath