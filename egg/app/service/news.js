const { Service } = require('egg');

class News extends Service {
  async list () {
    let {
      data
    } = await this.ctx.curl('http://www.juzimi.com');
    console.log(data.toString());
    return data;
  }
} 
module.exports = News;