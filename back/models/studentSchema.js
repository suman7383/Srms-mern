const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    reg:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },

    marks:[
        {
         type:Object  
        }

    ],
    tokens:[
        {
            token:{
                type:String,
            }
        }
    ],
    type:{
        type:String,
        required:true
    }
});


// password Hashing
studentSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();

})

studentSchema.methods.generateAuthToken = async function(){ 
    try{
        let token= jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(error){
        console.log(error);
    }
}

studentSchema.methods.addMarks = async function(id,maths,physics,algo,os){
    try{
        this.marks = this.marks.concat({id:id, maths:maths, physics:physics, algo:algo , os:os});
        await this.save();
        return this.marks; 
    }catch (error){
        console.log(error);
    }
}

const Student = mongoose.model('STUDENT',studentSchema);
module.exports=Student;