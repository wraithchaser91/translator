if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({limit: "10mb", extended: false}));
app.use(bodyParser.json());

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
db.on("error", error=>console.log(error));
db.on("open", ()=>console.log("Connected to mongoose"));

const {cleanBody} = require("./middleware");
app.use(cleanBody);

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
app.use("/", indexRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT || 3000);

/*
DATABASE_URL=mongodb+srv://admin:TbhoCorKe19n3xVd@cluster0-9bwu0.mongodb.net/test?retryWrites=true&w=majority
SESSION_SECRET=hgoinsdfoi8fGRWG8s
*/