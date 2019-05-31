const Controller = require('egg').Controller;

class UserCreate extends Controller {
  async  create (model, options) {
    let result = await this.ctx.model[model].create(options);
    return result;
  }
  async signin (model, options) {
    let result = await this.ctx.model[model].findOne(options);
    return result;
  }
}
module.exports = UserCreate;