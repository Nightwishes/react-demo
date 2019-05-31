const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
class IndexController extends Controller {
  async index () {
    const { ctx } = this;
    // const target = path.join(__dirname, '..', 'client/index.html');
    await ctx.redirect("/static/index.html");
  }
}
module.exports = IndexController;