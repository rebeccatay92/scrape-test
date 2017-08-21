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
    
    return res.send({
      title,
      vidUrl,
      steps
    })

    // var thisRecipe = new Recipe({
    //   title: title,
    //   vidUrl: vidUrl
    // })
    //
    // thisRecipe.save(function(err, savedRecipe) {
    //   if (err) return next(err)
    //   res.send(savedRecipe)
    // })

  })

  // Recipe.find(function (err, recipes) {
  //   if (err) return next(err);
  //   res.render('index', {
  //     title: 'Scrapie scrape',
  //     articles: articles
  //   });
  // });
})
