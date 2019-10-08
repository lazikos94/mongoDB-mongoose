const express = require('express');
const cors = require('cors');
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const assert = require('assert');
const objectId = require('mongodb').ObjectID;

const app = express(); 
const port = process.env.PORT || 5000;
app.use(cors());
app.listen(port, ()=> console.log('connected to port',port));
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
    age: Number,
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

const deleteDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('data');
    // Find some documents
    collection.deleteMany({});
}

app.post('/mongodb',(req,res)=>{
    const userdata = new Data(req.body);
    userdata.save();
    console.log('Item added');
})

app.get('/mongodb',(req,res)=>{
    MongoClient.connect(url_mongo,{useNewUrlParser: true,useUnifiedTopology:true},(err,client)=>{
        assert.equal(null,err);
        const collection = client.db(mongodb);  
        findDocuments(collection,() =>{
        client.close();
        });
    });         
})

app.get('/mongoget',(req,res)=>{
    var  resultArray  = [];
    MongoClient.connect(url_mongo,{useNewUrlParser: true,useUnifiedTopology:true},(err,client)=>{
        assert.equal(null, err);
        var db = client.db(mongodb);
        var cursor = db.collection('data').find();
        cursor.forEach((doc, err)=>{ 
          assert.equal(null, err);
          resultArray.push(doc);
        },()=> {
          client.close();
          res.json(resultArray);
        });
    });
});        

app.get('/mongoempty',(req,res)=>{
    MongoClient.connect(url_mongo,{useNewUrlParser: true,useUnifiedTopology:true},(err,client)=>{
        assert.equal(null,err);
        const db = client.db(mongodb);  
        deleteDocuments(db,() =>{
        client.close();
        });
    });   
});
app.post('/mongoupdate',(req,res)=>{
    const data = {
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'age': req.body.age,
    }
    const id = req.body._id;
    MongoClient.connect(url_mongo,{useNewUrlParser: true,useUnifiedTopology:true},(err,client)=>{
        assert.equal(null,err);
        const db = client.db(mongodb);
        db.collection('data').updateOne({"_id":objectId(id)},{$set:data},(err,result)=>{
            assert.equal(null,err);
            console.log('Item',objectId(id) ,'updated');
            client.close();
        });  
    });   
});
app.post('/mongodelete',(req,res)=>{

    const id = req.body._id;
    MongoClient.connect(url_mongo,{useNewUrlParser: true,useUnifiedTopology:true},(err,client)=>{
        assert.equal(null,err);
        const db = client.db(mongodb);
        db.collection('data').deleteOne({"_id":objectId(id)},(err,result)=>{
            assert.equal(null,err);
            console.log('Item',objectId(id) ,'deleted');
            client.close();
        });  
    });   
});