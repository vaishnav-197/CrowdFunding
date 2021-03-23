const express = require('express')
const router = express.Router()
var admin = require("firebase-admin");
const dbfunctions = require('../db/db');
var dbfunction = require('../db/db')
//firebase config


var serviceAccount = require("../serviceaccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://edu-donor-default-rtdb.firebaseio.com"
});



//csrf

// router.all("*", (req, res, next) => {
//     res.cookie("XSRF-TOKEN", req.csrfToken());
//     next();
//   });





// Add routes here


router.get('/', (req, res) => res.render('welcome'));



router.get('/login', (req, res) => res.render('login'));

router.get('/signup', (req, res) => res.render('signup'));






// dash


router.get("/dashboard", function (req, res) {
const sessionCookie = req.cookies.session || "";

admin
  .auth()
  .verifySessionCookie(sessionCookie, true /** checkRevoked */)
  .then((user) => {
    console.log(user.email)
    var response =  dbfunction.showdashboard(user.email)
    
    response.then((result)=> {
      var data = []
      if(result==''){
        return ''
      }
      else{
        result.forEach(doc => {
          data.push(doc.data())
            });
          return data
      }
      
      
      
    }).then((resp)=> {
      // console.log(resp)
      
      res.render('dashboard' , {data:resp})
    })
    
  })
  .catch((error) => {
    console.log(error)
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









router.get('/form', (req, res) => {
  const sessionCookie = req.cookies.session || "";
  admin
  .auth()
  .verifySessionCookie(sessionCookie, true /** checkRevoked */)
  .then((user) => {
    // console.log(user.email)
    res.render("form");
  })
  .catch((error) => {
    res.redirect("/login");
  });
  
} );

router.post('/add', 
    dbfunction.adddata
  )
  
router.get('/donate', (req,res) => {
  var result = dbfunctions.showdonate()
  
  result.then((data)=> {
    var objects = []
    if(result==''){
      return ''
    }
    else{
      data.forEach(doc => {
        objects.push(doc.data())
      });
      return objects
    }
    
  }).then((data) => {
    res.render('donate', {data:data})
  })
  
});





module.exports = router