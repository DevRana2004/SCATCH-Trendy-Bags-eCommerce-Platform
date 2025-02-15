const express =require('express');
const app=express();
const cookieParser = require("cookie-parser");
const path=require("path");
require("dotenv").config(); 
const db=require("./config/mongoose-connection") 

const ownersRouter = require("./routes/ownerRouter")
const userRouter = require("./routes/userRouter")
const productRouter = require("./routes/productRouter")
const indexRouter = require("./routes/index"); /// galti thi

///////////////////////////////////////////////////////////////////////

const flash = require("connect-flash");
const expressSession = require("express-session");

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash());

/////////////////////////////////////////////////////////////////////////////



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");

app.use("/owners",ownersRouter);   
app.use("/users",userRouter);   
app.use("/products",productRouter);   
app.use("/",indexRouter);

app.listen(3000);




