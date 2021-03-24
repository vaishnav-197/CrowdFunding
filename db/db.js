
const { render } = require("ejs");
var admin = require("firebase-admin");



var dbfunctions = {
    adddata : async function(req , res){
        const db = admin.firestore();
        console.log(req.body)
        // Add a new document with a generated id.
    const response = await db.collection('user').add({
    name: req.body.name,
    country: req.body.role,
    school : req.body.address,
    amount:parseInt(req.body.amount),
    email:req.body.email,
    prefer:req.body.prefer,
    comment:req.body.comment,
    contact: req.body.contact,
    received: parseInt(0)
  });
  
  if(response){
    var plan = true
    
    res.redirect('/dashboard')
  }
  else {
    return 'Couldnt Save'
  }
    },




    showdashboard : async function (user) {
      const db = admin.firestore();
      const docs = db.collection('user');
      const snapshot = await docs.where('email', '==', user).get();
      if (snapshot.empty) {
        // console.log('No matching documents.');
        return '';
      }  
     
      
      return snapshot
      
     

    },



    showdonate: async function() {
      const db = admin.firestore();
      const citiesRef = db.collection('user');
      const snapshot = await citiesRef.get();
      
      if (snapshot.empty) {
      console.log('No matching documents.');
      return;
      }  

      // snapshot.forEach(doc => {
      //   console.log(doc.id, '=>', doc.data());
      // });
      return snapshot
    }



}


module.exports = dbfunctions