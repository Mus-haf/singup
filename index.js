const express = require("express");
const mongoose = require("mongoose");
const body_parser=require("body-parser");
const app = express();
app.use(body_parser.json())
const db = "mongodb+srv://shaharyarkhan2050:shehri12345@signup.iamgv.mongodb.net/database?retryWrites=true&w=majority&appName=signup"
mongoose.connect(db).then(() => {
    console.log("connected");
}).catch((err) => {
    console.log("Not connected!", err);
})

const userschema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const collection = new mongoose.model("dataitem", userschema);


app.post("/signup", (req, resp) => {
    try {
        const { name, email, password } = req.body;

        const data = new collection({
            name: name,
            email: email,
            password: password
        });
        
        data.save();
        resp.send({
            status: 200,
            message: "data send successfully",
            data: data
        })
    } catch (error) {
        resp.send({
            status: 200,
            message: "Wrong!",
            err: error
        })
    }
})

app.listen(8000, () => {
    console.log("server is running");
})