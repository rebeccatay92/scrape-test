var mongoose = require('mongoose'),
  Schema = mongoose.Schema

var RecipeSchema = new Schema({
  title: String,
  vidUrl: String
})

RecipeSchema.virtual('date')
  .get(function () {
    return this._id.getTimestamp()
  })

mongoose.model('Recipe', RecipeSchema)
