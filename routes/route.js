const express = require('express')
const router = express.Router()
// Add routes here


router.get('/', (req, res) => res.render('welcome'));

router.get('/donate', (req, res) => res.render('donate'));

router.get('/login', (req, res) => res.render('login'));

router.get('/signup', (req, res) => res.render('signup'));


module.exports = router