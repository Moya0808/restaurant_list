const mongoose = require('mongoose')

const Restaurant = require('../restaurant')

const rawData = require('./restaurant.json')
const restaurantList = rawData.results

mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  for (const restaurant of restaurantList) {
    Restaurant.create({
      name: restaurant.name,
      category: restaurant.category,
      location: restaurant.location,
      google_map: restaurant.google_map,
      phone: restaurant.phone,
      description: restaurant.description,
      image: restaurant.image,
      rating: restaurant.rating
    })
  }
  console.log('done')
})