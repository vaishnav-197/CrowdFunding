const express = require('express')
const router = express.Router()
// Add routes here


router.get('/', (req, res) => res.render('welcome'));

router.get('/donate', (req, res) => res.render('donate'));

router.get('/login', (req, res) => res.render('login'));


module.exports = router