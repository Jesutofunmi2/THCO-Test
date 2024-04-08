const express = require("express");
const dotenv =  require('dotenv');
const {MongoClient} = require("mongodb");
let db;
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", async(req, res) => {
    const allUsers = await db.collection("users").find().toArray()
    console.log(allUsers);
    res.send("Welcome to my page")
}) 

app.get("/admin", (req, res) => {
    res.send("Welcome to my page admin")
})

async function start() {
    const client = new MongoClient("mongodb://root:root@localhost:27017/test-thco?&authSource=admin") 
    await client.connect()
    db = client.db()
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
}

start()

