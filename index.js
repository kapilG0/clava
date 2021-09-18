const express=require('express')
const mongoose=require('mongoose')
const url="mongodb://localhost:27017/enrollement"
mongoose.connect(url,(err,res)=>{
    if(err){
        console.log(err)
    }else{
        console.log('data')
    }
})
// console.log(window.location.href)
const enrollement=require('./models/data')
const bodyParser = require('body-parser')
const app=express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.set('view engine','ejs')
app.get('/',async (req,res)=>{
    const data=await enrollement.find({})
    res.render('home',{data:data})
})
app.get('/add',(req,res)=>{
    res.render('add')
})




app.post('/enroll',async(req,res)=>{
    console.log(req.body)
    if(parseInt(req.body.dob)<10 ){
        console.log(req.body.dob,"age")
        return res.render('add',{error:"age must be greater than or equal to 10"})
    }
    if(req.body.email){
        console.log(req.body.email,"email")
        enrollement.findOne({email:req.body.email},(err,data)=>{
            if(data){
                console.log(data,"data")
                return res.render('add',{error:"Email Id already exist"})
            }
        })
    }
    const data=new enrollement(req.body)
    const re= await data.save()
    console.log(re,'re')
    res.send('data saved')
    
})

app.get('/edit/:id',(req,res)=>{
    console.log(req.params.id)
    enrollement.findById({_id:req.params.id},(err,data)=>{
        if(err){
            return err
        }
        if(data!==null){
            console.log(data,"data")
            res.render('edit',{data:data})
        }
    })
})


app.get('/show/:id',(req,res)=>{
    console.log(req.params.id)
    enrollement.findById({_id:req.params.id},(err,data)=>{
        if(err){
            return err
        }
        if(data!==null){
            console.log(data,"data")
            res.render('show',{data:data})
        }
    })
})


app.post('/edit',async(req,res)=>{
    console.log(req.body,'edit')
    const data=await enrollement.updateOne({_id:req.body._id},req.body)
        // console.log(data,'previous')
        // console.log(req.body,'req body')
        // const newdata=new enrollement(req.body)
        // data=req.body;
        // data.save()
        res.send('data editted successfully')
    })


app.listen(3000,()=>console.log('server started'))