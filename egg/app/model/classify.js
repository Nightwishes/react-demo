// app代表应用
module.exports = app => {
  let mongoose = app.mongoose;
  let Schema = mongoose.Schema;
  const ClassifySchema = new Schema({
    name: {
      type: String,
      required: true
    },
    smile: {
      type: String,
      required: true
    }
  })
  return mongoose.model('Classify', ClassifySchema, 'classify');
}