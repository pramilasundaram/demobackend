const express=require('express')
const dotenv=require('dotenv').config();
const cors=require('cors');
const bodyParser=require('body-parser')
let PORT=process.env.PORT
const server=express();
const mongoose=require('mongoose')


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');  
  console.log("db connected")
}

const userScheme = new mongoose.Schema({
    username: String,
    password:String
  });

const User = mongoose.model('user', userScheme);

server.use(cors());
server.use(bodyParser.json());



server.post('/demo',async(req,res)=>{
    const user = new User();
    user.username= req.body.username; 
    user.password= req.body.password;
    const doc=await user.save();  
    console.log(doc)
    res.json(doc)
})
server.get('/demo',async(req,res)=>{  
    const docs=await User.find({})
    res.json(docs)
})

server.listen(PORT,()=>{
    console.log(`Server started ${PORT}`)
})