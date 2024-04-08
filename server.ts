const express = require("express");
const dotenv =  require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to my page")
}) 

app.get("/admin", (req, res) => {
    res.send("Welcome to my page admin")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });