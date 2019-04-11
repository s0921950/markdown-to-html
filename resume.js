var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://adam:Adam0409@cluster0-hawj2.mongodb.net/test?retryWrites=true";

MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("resume");
  dbo.collection("test").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});