const express = require('express')
const router = express.Router()
var admin = require("firebase-admin");

//firebase config


var serviceAccount = require("../serviceaccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://crowdsourcing-58297-default-rtdb.firebaseio.com"
});



//csrf

router.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
  });


// Add routes here


router.get('/', (req, res) => res.render('welcome'));

router.get('/donate', (req, res) => res.render('donate'));

router.get('/login', (req, res) => res.render('login'));

router.get('/signup', (req, res) => res.render('signup'));

router.get('/dashboard', (req, res) => res.render('dashboard'));


router.get("/profile", function (req, res) {
const sessionCookie = req.cookies.session || "";

admin
  .auth()
  .verifySessionCookie(sessionCookie, true /** checkRevoked */)
  .then(() => {
    res.render("profile");
  })
  .catch((error) => {
    res.redirect("/login");
  });
});

//session 

router.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

router.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});

router.get('/form', (req, res) => res.render('form'));




module.exports = router