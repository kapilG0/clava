const mongoose=require('mongoose')
const enrollementSchema=new mongoose.Schema({
    studentname:{
        type:String,
        required:true
    },
    fathername:{
        type:String,
        required:true
    },
    dob:{
        type:Number,
        required:true,
        validate(dob){
            if(dob<10){
                throw new Error('Age should be greater than 10')
            }
        }
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pincode:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    drop:{
        type:String
    },
    marks:{
        type:String
    },
    date:{
        type:String,
    }
})

// enrollementSchema.pre('save',function(err,doc,next){
//     console.log(err.name,'err')
//     if(err.name==='MongoError'){
//         next(new Error('Email must be unique . It is already present registered'))
//     }else if(err.ValidationError){
//         next(new Error('Age must be greater than 10'))
//     }else{
//         next()
//     }
// })

const enrollement=mongoose.model('enrollement',enrollementSchema)
module.exports=enrollement