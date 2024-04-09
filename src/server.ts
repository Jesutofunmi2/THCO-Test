const express = require("express");
const dotenv =  require('dotenv');
const {MongoClient} = require("mongodb");
const middleware = require('./middlewares/error-handler')
const authRoutes = require('./routes/authRoutes');
const authRoute = require('./routes/authRoutes');

let db;
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());




async function start() {
    const client = new MongoClient("mongodb://root:root@localhost:27017/test-thco?&authSource=admin") 
    await client.connect()
    db = client.db()
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
}

start()

app.use(authRoutes);
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(middleware.defaultErrorHandler)

module.exports = app

