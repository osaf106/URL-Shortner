const express = require('express')
const router = express.Router();
const {handleGenerateNewURL,handleAnalyticClicks} = require('../controllers/url')



router.route('/create').post(handleGenerateNewURL)

router.route('/analytics/:shortID').get(handleAnalyticClicks)

module.exports = router;