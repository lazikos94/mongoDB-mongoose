const express = require('express');
const cors = require('cors');
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const assert = require('assert');

const app = express(); 
const port = process.env.PORT || 5000;
app.use(cors());
app.listen(port, ()=> console.log('listening'));
app.use(express.static(__dirname + '/public'));
app.use(express.json({limit:'10mb'}));
const mongodb = 'mongoDatabase';
const url_mongo = 'mongodb://localhost:27017/mongoDatabase';

app.get('/', function(req, res){
    res.sendFile('inputpage.html', { root: __dirname + "/public/files" } );
});


try{
    mongoose.connect(url_mongo, {useNewUrlParser: true,useUnifiedTopology:true});
} catch(error){
    console.log(error);
}
var db = mongoose.connection; 

var Schema = mongoose.Schema;

var dataSchema = new Schema({
    first_name: String,
    last_name: String,
    address: String,
    country:String,
},{collection:'data'});

var Data = mongoose.model('data',dataSchema);

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('data');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
}

app.post('/mongodb',(req,res)=>{
    const userdata = new Data(req.body);
    userdata.save();
})
app.get('/mongodb',(req,res)=>{
    MongoClient.connect(url_mongo,(err,client)=>{
        assert.equal(null,err);
        const db = client.db(mongodb);  
        findDocuments(db,() =>{
        client.close();
        });
    });         
})
