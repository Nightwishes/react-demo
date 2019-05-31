module.exports = app => {
  let mongoose = app.mongoose;
  let Schema = mongoose.Schema;
  const ArticleSchema = new Schema({
    // 标题
    title: {
      type: String,
      required: true
    },
    // 正文
    content: {
      type: String,
      required: true
    },
    // 分类
    classify: {
      type: Schema.Types.ObjectId,
      ref: 'Classify'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    pv: {
      type: Number
    },
    // 评论
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        content: {
          type: String
        }
      }
    ],
    // 创建日期
    createAt: {
      type: Date,
      default: Date.now // 默认为当前时间
    }
  })
  return mongoose.model('Article', ArticleSchema, 'article');
}