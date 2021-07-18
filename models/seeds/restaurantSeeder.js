const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')
const rawData = require('./restaurant.json')
const restaurantList = rawData.results


// 連線成功
db.once('open', () => {
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