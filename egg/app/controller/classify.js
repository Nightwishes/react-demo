const BaseController = require('./baseController');
class ClassifyController extends BaseController {
  async createClassify () {
    const { ctx } = this;
    let obj = ctx.request.body;
    let data = await ctx.model.Classify.findOne(obj);
    if (data) {
      this.error('此分类已存在!');
    } else {
      try {
        let classify = await ctx.model.Classify.create(obj);
        this.success(classify);
      } catch (error) {
        this.error('数据库出错!');
      }
    }
  }
  async classifyFenye () {
    try {
      let data = await this.fenye('Classify', ['name']);
      this.success(data);
    } catch (error) {
      this.error('出错!');
    }
  }
  async update () {
    const { ctx } = this;
    let id = ctx.params.id;
    console.log(id);
    let classify = ctx.request.body;
    console.log(classify);
    try {
      await ctx.model.Classify.findByIdAndUpdate(id, classify);
      this.success('修改成功!');
    } catch (error) {
      console.log(error);
      this.error('修改失败');
    }
  }
  async delete () {
    const { ctx } = this;
    let id = ctx.params.id;
    let delArray = ctx.request.body;
    if (delArray.length) {
      try {
        await ctx.model.Classify.remove({
          _id: {
            $in: delArray
          }
        })
        this.success('删除成功!');
      } catch (error) {
        this.error('删除失败!');
      }
    } else {
      try {
        await ctx.model.Classify.findByIdAndRemove(id);
        this.success('删除成功!');
      } catch (error) {
        this.error('删除失败!');
      }
    }
  }
  async findAll () {
    const { ctx } = this;
    try {
      let classifys = await ctx.model.Classify.find({});
      this.success(classifys);
    } catch (error) {
      this.error('查找出错!');
    }
  }
}
module.exports = ClassifyController;