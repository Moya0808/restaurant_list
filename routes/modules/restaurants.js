const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//新增餐廳頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增餐廳POST路由
router.post('/', (req, res) => {
  const inputData = req.body
  return Restaurant.create({
    name: inputData.name,
    category: inputData.category,
    image: inputData.image,
    location: inputData.location,
    phone: inputData.phone,
    google_map: inputData.google_map,
    rating: inputData.rating,
    description: inputData.description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Show細節路由
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//編輯頁面路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//編輯POST路由
router.put('/:id', (req, res) => {
  const id = req.params.id
  const editData = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
    restaurant.name = editData.name,
    restaurant.category = editData.category,
    restaurant.image = editData.image,
    restaurant.location = editData.location,
    restaurant.phone = editData.phone,
    restaurant.google_map = editData.google_map,
    restaurant.rating = editData.rating,
    restaurant.description = editData.description
    return restaurant.save()
  })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//刪除路由
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router