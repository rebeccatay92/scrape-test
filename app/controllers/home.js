const express = require('express')
const request = require('request')
const cheerio = require('cheerio')

const router = express.Router()
  mongoose = require('mongoose'),
  Recipe = mongoose.model('Recipe');

module.exports = function (app) {
  app.use('/', router)
}

router.get('/', function (req, res, next) {
  let url = 'http://themeatmen.sg/five-spice-calamari-with-wasabi-mayo/'

  request(url, function (err, response, body) {
    if (err) return next(err)

    const $ = cheerio.load(body)
    let title = $('.entry-title').text()
    let vidUrl = $('.embed-container').find('iframe').attr('src')
    let steps = $('.recipe-instructions').find('li').map(function(index, step) {
      var $stepText = $(this).find('p')
      return $stepText.text()
    }).get()

    Recipe.create({
      title,
      vidUrl,
      steps
    }, function (err, createdRecipe) {
      if (err) return next(err)
      return res.send(createdRecipe)
    }) // close created

  }) // close request

}) // close router.get
