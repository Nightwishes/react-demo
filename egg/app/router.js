'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.index.index);
  // 注册
  router.post('/api/signup', controller.user.signup);
  // 登录
  router.post('/api/signin', controller.user.signin);
  // 退出
  router.get('/api/signout', controller.user.signout);
  // 获取所有的用户
  router.get('/api/user/all', controller.user.findAll);
  // 添加一个用户
  router.post('/api/user/set', controller.user.setUser);
  // 删除一个用户
  router.delete('/api/user/delete/:id', controller.user.deleteUser);
  // 查找一个用户
  router.get('/api/user/findOne/:id', controller.user.findOne);
  // 用户头像
  router.post('/api/user/avatar/:id', controller.upload.index);
  // 修改一个用户
  router.put('/api/user/update/:id', controller.user.update);

  // 分类的创建createClassify
  router.post('/api/classify/create', controller.classify.createClassify);
  // 分页
  router.get('/api/classify/fenye', controller.classify.classifyFenye);
  // 更新
  router.put('/api/classify/update/:id', controller.classify.update);
  // 删除
  router.delete('/api/classify/delete/:id', controller.classify.delete);
  router.get('/api/classify/findAll', controller.classify.findAll);
  // 文章
  router.post('/api/article/create', controller.article.create);
  router.get('/api/article/keyWord', controller.article.keyWord);
  router.get('/api/article/findAll', controller.article.findAll);
  router.get('/api/article/findOne/:id', controller.article.findOne);
  router.put('/api/article/update/:id', controller.article.update);
  router.delete('/api/article/delete/:id', controller.article.delete);
  router.post('/api/article/pv/:id', controller.article.pvUpdate);
  router.post('/api/article/comment/:id', controller.article.comment);
  router.delete('/api/article/comment/:articleId/:commentId', controller.article.delComment);
};
