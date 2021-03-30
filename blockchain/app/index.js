const express = require('express');
const Blockchain = require('../index');
const bodyParser = require('body-parser');
const P2pServer = require('./p2p-server.js');
//get the port from the user or set the default port
const PORT = process.env.PORT || 3001;

//create a new app
const app  = express();

//using the blody parser middleware
app.use(bodyParser.json());

// create a new blockchain instance
const blockchain = new Blockchain();

//EXPOSED APIs

//api to get the blocks
app.get('/blocks',(req,res)=>{

    res.json(blockchain.chain);

});

//api to add blocks
app.post('/mine',(req,res)=>{
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks');
});

// app server configurations
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})


const p2pserver = new P2pServer(blockchain);
// passing blockchain as a dependency


p2pserver.listen(); // starts the p2pserver