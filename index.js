const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;



//// for middleware
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.send("Tourism site is appears now! ")
})


app.listen(port, () => {
    console.log("Ok I am now ok!")
})