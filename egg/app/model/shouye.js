module.exports = app => {
  let mongoose = app.mongoose;
  let Schema = mongoose.Schema;
  const ShouyeSchema = new Schema({
    createAt:  {
      type: Date,
      default: Date.now
    },
    content: {
      type: String,
      required: true
    }
  })
  return mongoose.model('Shouye', ShouyeSchema, 'shouye');
}