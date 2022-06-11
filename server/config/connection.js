const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/secret-shelf-71482', 
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://downerdm:Password10@cluster0.7jspa.mongodb.net/secret-shelf-71482?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("secret-shelf-71482").collection("books");
//   // perform actions on the collection object
//   client.close();
// });
