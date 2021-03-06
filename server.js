require("dotenv").config({path: __dirname + '/.env'});

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static(__dirname + "/public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({limit: "10mb", extended: false}));
app.use(bodyParser.json({limit: "10mb", extended: false}));

var device = require('express-device');
app.use(device.capture());

//init passport
const passport = require("passport");
const initPassport = require("./passport-config");
initPassport(passport);
const flash = require("express-flash");
const session = require("express-session");
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection;
db.on("error", error=>console.error(error));
db.on("open", ()=>{console.log("Connected to mongoose");});

const {cleanBody} = require("./middleware");
app.use(cleanBody);

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
app.use("/", indexRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT || 3000);