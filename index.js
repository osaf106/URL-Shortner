// app create 
const express = require('express')
const app = express();
const PORT = 3106;


const {connectionMongodb} = require('./connection')
const URL = require('./models/url')
const path = require('path')


const staticRouter = require('./routes/staticRouter')
const urlRouter = require('./routes/url')
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');
const {    checkFromAuthentication,restrictTo} = require('./middleWare/auth')
// middleWare
// app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(checkFromAuthentication)

app.use('/', staticRouter);
app.use('/url', restrictTo(["NORMAL"]) ,urlRouter)
app.use('/user',userRouter)



// view engine 
app.set("view engine",'ejs');
app.set('views',path.resolve('./views'))


// app.get('/test',async(req,res)=>{
//     const allUrl = await URL.find({});
//     return res.render('home',{urls: allUrl})
// })





// connection
connectionMongodb("mongodb://127.0.0.1:27017/shortURl").then(()=>console.log("Mongo Connected"));







app.use('/url/:shortId',async (req,res)=>{
    let count=0;
    const shortID = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortID
        },{$push: {
            totalClicks: {
                timestamp: Date.now(),
                clicks: ++count
            }
        }}
    )
    console.log(entry);
    res.redirect(entry.orignalURL)
})






app.listen(PORT,()=> console.log("Server Start", PORT));