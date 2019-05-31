let base = require('./baseController');

class ArticleController extends base {
  async create() {
    const {
      ctx
    } = this;
    let article = ctx.request.body;
    if (!article.title || !article.content) {
      this.error('标题或者内容无数据');
      return;
    }
    try {
      let newArticle = await ctx.model.Article.create(article);
      this.success(newArticle);
    } catch (error) {
      console.log(error);
      this.error(error);
    }
  }
  async update() {
    const {
      ctx
    } = this;
    let id = ctx.params.id;
    let article = ctx.request.body;
    try {
      await ctx.model.Article.findByIdAndUpdate(id, article);
      this.success("修改成功!");
    } catch (error) {
      console.log(error);
      this.error("修改失败!");
    }
  }
  async findAll() {
    const {
      ctx
    } = this;
    try {
      let list = await ctx.model.Article.find();
      this.success(list);
    } catch (error) {
      this.error(error);
    }
  }
  // 文章的分页查询还有keyword
  async keyWord() {
    let result =  await this.fenye('Article', ['title', 'content'], ['classify', 'user']);
    this.ctx.body = {
      code: 0,
      data: result
    }
  }
  // 删除一篇文章
  async delete () {
    const { ctx } = this;
    let id = ctx.params.id;
    let data = ctx.request.body;
    console.log(id);
    console.log(data);
    if (data.length > 1) {
      try {
        await ctx.model.Article.remove({
          _id: {
            $in: data
          }
        })
        this.success("删除成功!");
      } catch (error) {
        console.log(error);
        this.error("删除失败!");
      }
    } else {
      try {
        console.log(id);
        await ctx.model.Article.findByIdAndRemove(id);
        this.success("删除成功");
      } catch (error) {
        this.error("删除失败");
      }
    }
  }
  // 更新article的pv
  async pvUpdate () {
    const { ctx } = this;
    let id = ctx.params.id;
    try {
      await ctx.model.Article.findByIdAndUpdate(id, {
        $inc: {
          pv: 1
        }
      })
      this.success("pv更新成功!");
    } catch (error) {
      console.log(error);
      this.error(error);
    }
  }
  // 提交评论
  async comment () {
    const { ctx } = this;
    let id = ctx.params.id;
    let comment = ctx.request.body;
    comment.user = this.getId();
    try {
      await ctx.model.Article.findByIdAndUpdate(id, {
        $push: { comments: comment }
      })
      this.success("评论成功!");
    } catch (error) {
      console.log(error);
      this.error(error);
    }
  }
  // 删除评论
  async delComment () {
    const { ctx } = this;
    const articleId = ctx.params.articleId;
    const commnetId = ctx.params.commentId;
    try {
      await ctx.model.Article.findByIdAndUpdate(articleId, {
        $pull: {
          comments: {_id: commnetId}
        }
      })
      this.success('删除评论成功');
    } catch (error) {
      this.error('删除评论失败!');
    }
  }
  // 获取指定的文章
  async findOne () {
    const { ctx } = this;
    const id = ctx.params.id;
    try {
      let article = await ctx.model.Article.findOne({
        _id: id
      }).populate('user', ['username', 'avatar', 'honey']);
      this.success(article);
    } catch (error) {
      this.error('查询失败!');
    }
  }
}
module.exports = ArticleController;