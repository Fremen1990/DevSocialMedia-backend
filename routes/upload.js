const express = require('express')
const { uploadImages, listImages } = require('../controllers/upload')
const { imageUpload } = require('../middlewares/imageUpload')
const { authUser } = require('../middlewares/auth')
const router = express.Router()

router.post('/uploadImages', authUser, imageUpload, uploadImages)
router.get('/listImages', listImages)

module.exports = router
