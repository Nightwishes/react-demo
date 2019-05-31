
let { Controller } = require('egg');

class BaseController extends Controller {
  success (data) {
    this.ctx.body = {
      code: 0,
      data
    }
  }
  error (error) {
    this.ctx.body = {
      code: 1,
      error
    }
  }
  getId () {
    const { ctx } = this;
    return ctx.session.user;
  }
  async fenye (model, fields = [], populateFields = []) {
    const { ctx } = this;
    let { pageNum, pageSize, keyword = '', classifyId } = ctx.request.query;
    pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    pageSize = isNaN(pageSize) ? 5 : parseInt(pageSize);
    let query = {};
    if (keyword && fields.length > 0) {
      query['$or'] = fields.map(field => ({
        [field]: new RegExp(keyword)
      }))
    }
    if (classifyId) {
      query.classify = classifyId
    }
    try {
      let count = await ctx.model[model].count(query);
      let cursor = ctx.model[model].find(query).skip((pageNum - 1) * pageSize).limit(pageSize);
      populateFields.forEach(field => {
        cursor = cursor.populate(field);
      })
      let list = await cursor;
      return Promise.resolve({
        count,
        list,
        pageNum,
        pageSize
      });
    } catch (error) {
      console.log(error);
      this.error(error);
    }
  }
}
module.exports = BaseController;
