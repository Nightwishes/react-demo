
const BaseController = require('./baseController');
const model = 'User';
class UserController extends BaseController {
  async signup() {
    const { ctx } = this;
    let user = ctx.request.body;
    console.log(user);
    if (!user.username || !user.password) {
      this.error('无数据');
      return
    }
    try {
      let data = await this.service.user.create(model, user);
      this.success(data);
    } catch (error) {
      this.error(error);
    }
  }
  async signin () {
    const { ctx } = this;
    let data = ctx.request.body;
    console.log(data);
    try {
      data = await this.service.user.signin(model, data);
      if (data) {
        // 如果登录成功了,则需要写入session会话
        // 可以通过ctx.session.user是否为null来判断此用户是否登录
        this.success(data._id);
      } else {
        this.error('用户名或者密码不正确!');
      }
    } catch (error) {
      this.error(error);
    }
  }
  async signout () {
    const { ctx } = this;
    ctx.session.user = null;
    this.success("退出成功!");
  }
  async setUser () {
    const { ctx } = this;
    const data = ctx.request.body;
    try {
      let user = await ctx.model.User.create(data);
      this.success(user);
    } catch (error) {
      this.error('创建用户失败!');
    }
  }
  async findAll () {
    try {
      let data = await this.fenye('User', ['username']);  
      this.success(data);
    } catch (error) {
      this.error('查找出错!');
    }
    
  }
  async deleteUser () {
    const { ctx } = this;
    const id = ctx.params.id;
    try {
      await ctx.model.User.remove({
        _id: id
      })
      this.success('删除用户成功!');
    } catch (error) {
      console.log(error);
      this.error('删除用户失败');
    }
  }
  async findOne () {
    const { ctx } = this;
    const id = ctx.params.id;
    try {
      let data = await ctx.model.User.findOne({
        _id: id
      }, {
        username: 0,
        password:0
      })
      this.success(data);
    } catch (error) {
      this.error('查找失败!');
    }
  }
  async update() {
    console.log(1);
    const { ctx } = this;
    const id = ctx.params.id;
    console.log(id);
    const data = ctx.request.body;
    try {
      await ctx.model.User.findByIdAndUpdate(id, data);
      let user = await ctx.model.User.findById(id);
      this.success(user);
    } catch (error) {
      console.log(error);
      this.error('修改用户出错');
    }
  }
}

module.exports = UserController;
