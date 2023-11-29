var express = require('express')
const app = express()
const dotenv = require("dotenv");
const cors =require('cors')
const port = process.env.PORT || 5000;
const cookie_parser=require("cookie-parser")
const mongoose =require('mongoose')

dotenv.config();


app.use(cors({
    origin: ["http://localhost:3000","https://shiny-cranachan-d17576.netlify.app/"],
    credentials: true
}));


app.use(express.json())

// const url = "mongodb://localhost:27017/lostANDfound";
console.log(process.env.MDB_CONNECT);
mongoose.connect("mongodb+srv://LostFound:KltZpBaqvYaqN4PY@cluster0.zhoru3b.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify: false,
    // useCreateIndex:true
}).then(()=>{
    console.log("database connection is successful");
}).catch((err)=>{
    console.log("database connection failed with err " + err);
});

app.use("/auth", require('./routers/auth.js'));
app.use('/',require('./routers/category.js'));


app.listen(port,()=> console.log(`Listening to port ${port} !!`))
