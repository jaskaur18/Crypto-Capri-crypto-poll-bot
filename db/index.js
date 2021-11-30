const { errorHandler } = require('../helpers')
const MongoClient = require("mongodb").MongoClient;

const uri =
    "";
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
