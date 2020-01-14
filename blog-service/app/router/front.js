
module.exports = app => {
  const { router, controller } = app

  router.get('/front/index', controller.front.home.index)

  router.get('/front/articleList', controller.front.home.getArticleList)
}