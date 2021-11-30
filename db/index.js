const { errorHandler } = require('../helpers')
const MongoClient = require("mongodb").MongoClient;

const uri =
    "mongodb+srv://testuser:9dzeCguIGfP9nV4J@cluster0.nr0ri.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-3lup83-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect(async function (err) {
    if (err) {
        return console.error(err);
    }
    await console.log("Connected successfully to Our server");
});
db = client.db("capripoll")
module.exports = { db };