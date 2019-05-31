const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const md5 = require('md5');
// 文件读写流ready库，能够使用await
const awaitWriteStream = require('await-stream-ready').write;
// 将stream消耗掉
const sendToWormhole = require('stream-wormhole');
class UploadController extends Controller {
  async index () {
    const {ctx } = this;
    const id = ctx.params.id;
    console.log(id);
    // 获取stream
    const stream = await ctx.getFileStream();
    // 生成文件名
    const filename = md5(stream.filename) + path.extname(stream.filename).toLocaleUpperCase();
    const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
    // 生成一个文件写入流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件写入
      await awaitWriteStream(stream.pipe(writeStream));
      await ctx.model.User.findByIdAndUpdate(id, {
        avatar: `http://localhost:7001/static/uploads/${filename}`
      })
      ctx.body = {
        code: 0,
        message: '上传并且保存成功!'
      }
    } catch (error) {
      // 如果出错关闭管道
      await sendToWormhole(stream);
      throw error;
    }
  }
}
module.exports = UploadController;