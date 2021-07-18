const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//搜尋路由
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      restaurantSearch = restaurants.filter((restaurant) => {
        return restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || restaurant.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      })
      if (restaurantSearch.length === 0) {
        res.render('find_no_result', { keyword })
      } else {
        res.render('index', { restaurants: restaurantSearch })
      }
    })
    .catch(error => console.log(error))
})

module.exports = router