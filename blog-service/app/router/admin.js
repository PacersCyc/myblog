module.exports = app => {
  const { router, controller } = app
  let adminAuth = app.middleware.adminAuth()
  
  router.get('/admin/index', adminAuth, controller.admin.main.index)

  router.post('/admin/login', controller.admin.main.login)

  router.get('/admin/types', adminAuth, controller.admin.main.getTypes)

  router.post('/admin/article', adminAuth, controller.admin.main.addArticle)

  router.put('/admin/article', adminAuth, controller.admin.main.updateArticle)

  router.get('/admin/articleList', adminAuth, controller.admin.main.getArticleList)

  router.delete('/admin/article/:id', adminAuth, controller.admin.main.deleteArticle)

  router.get('/admin/article/:id', adminAuth, controller.admin.main.getArticleById)
}