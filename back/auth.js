const express=require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const authenticate = require('./middleware/authenticate');
const studentAuthenticate = require('./middleware/studentAuthenticate');

require('./db/conn');
const User=require('./models/adminSchema');
const Student=require('./models/studentSchema');

router.post('/SRegister',(req,res)=>{
    const {name, email , reg, phone} =req.body;
    const password = "Student";
    const cpassword = "Student";
    const type = "student";

    if(!name || !email || !phone || !reg ){

        return res.status(402).json({error:"Please Enter All data"});
    }

    Student.findOne({reg:reg})
    .then((studentExist)=>{
        if(studentExist){
            return res.status(422).json({error: "Student Already Exists"});
        }
    
        const student = Student({name, email, reg, phone , password, cpassword,type});
        student.save().then(()=>{
            res.status(201).json({message:"Student registered Successfully"});
        }).catch((err)=>{
            res.status(500).json({Error:"Failed to register"});
        })
    }).catch((error)=>{
        console.log(error);
    })
})

router.post('/SLogin', async(req,res)=>{
    
    try{
        const {reg,password} = req.body;

        if(!reg || !password){
            res.status(400).json({message:'Please Fill the Data'});
        }

        const studentLogin = await Student.findOne({reg:reg});
    
        if(studentLogin){

            const isMatch= await bcrypt.compare(password,studentLogin.password);
            if(!isMatch){
                res.status(400).json({error:"Invalid Credentials"});
            }
            else{
               
                const token = await studentLogin.generateAuthToken();
                res.cookie('stoken',token,{
                    expires: new Date(Date.now()+86400000),
                    httpOnly:true
                });

                res.status(200).json({message:'Success'});
        }
        }else{
            res.status(400).json({message:"Invalid Credentials"});
        }

        
}   catch(err){
        console.log(err);
}
});


router.post('/ARegister',(req,res)=>{
    const { name, email, password, cpassword, phone} = req.body;

    if(!name || !email || !password || !cpassword || !phone){
        return res.status(422).json({error:"Please Enter All data"});
    }

    User.findOne({email:email})
    .then((userExist)=>{
        if(userExist){
            return res.status(422).json({error: "User Already Exists"});
        }else if(password != cpassword){
            return res.status(422).json({error: "Passwords don't match"});
        }

        const user = User({name,email,password,cpassword,phone});
        user.save().then(()=>{
            res.status(201).json({message:"Admin registered Successfully"});
        }).catch((err)=>{
            res.status(500).json({Error:"Failed to register"});
        })

    }).catch((error)=>{
        console.log(error);
    })
})

router.post('/ALogin', async(req,res)=>{
    
    try{
        const {email,password} = req.body;

        if(!email || !password){
            res.status(400).json({message:'Please Fill the Data'});
        }

        const userLogin = await User.findOne({email:email});
    
        if(userLogin){

            const isMatch= await bcrypt.compare(password,userLogin.password);

            if(!isMatch){
                res.status(400).json({error:"Invalid Credentials"});
            }
            else{
               
                const token = await userLogin.generateAuthToken();
                res.cookie('jwtoken',token,{
                    expires: new Date(Date.now()+86400000),
                    httpOnly:true
                });

                res.status(200).json({message:'Success'});
        }
        }else{
            res.status(400).json({message:"Invalid Credentials"});
        }

        
}   catch(err){
        console.log(err);
}
});

router.post('/StudentMarks',studentAuthenticate,(req,res)=>{
    const {selected}=req.body;
    let data={};
    if(req.rootStudent.marks.length!=0){
        req.rootStudent.marks.map((mark)=>{
            if(mark.id==selected){
                data={mark}
            }
        })
    res.status(200).send(data);
    }else{
        res.status(200);
    }
    
})

router.post('/Marks',authenticate,async(req,res)=>{
    const {reg, id, maths, physics, algo, os} = req.body;

    const student =await Student.findOne({reg:reg});
    if(student){
        let idPresent=false;
        
        student.marks.map((item)=>{
            if(item.id===id){
                idPresent=true;
            }
        }) 

        if(!idPresent){
            const update = await student.addMarks(id,maths,physics,algo,os);
            res.status(200).json({message:"success"})
        }else if(idPresent){
            res.status(422).json({message:"success"})
        }

    }else{
        res.status(401).json({message:"Failure"})
    }
})


router.get('/StudentProfile',studentAuthenticate,(req,res)=>{
    console.log("Welcome Student to your profile");
    res.clearCookie('jwtoken', {path: '/'});
    if(req.status!==401){
        res.status(req.status).send(req.rootStudent);
    }else{
        res.sendStatus(req.status);
    }
})

router.get('/AdminProfile',authenticate,(req,res)=>{
    console.log("Welcome to your profile");
    res.clearCookie('stoken', {path: '/'});
    res.send(req.rootAdmin);
})

router.get('/AdminLogged',authenticate,(req,res)=>{
    res.sendStatus(req.status);
})

router.get('/StudentLogged',studentAuthenticate,(req,res)=>{
    res.sendStatus(req.status);
    
})

router.get('/AdminResult',authenticate,async(req,res)=>{
    console.log("Welcome to your profile");

    const Cursor= Student.find({type:"student"},{password:0, cpassword:0 , tokens: 0 , email:0 , phone:0}).sort({reg:1})
    let data=[];
    await Cursor.map((item)=>{
        data.push(item);
    });

    if(req.status!==401){
        res.send(data);
    }else{
        res.sendStatus(req.status);
    }
})

router.get('/StudentResult',studentAuthenticate,(req,res)=>{
    console.log("Welcome to your profile");
    if(req.status==200){
        const data=req.rootStudent.marks.length;
        res.status(req.status).send({data});
    }else{
        const data=0;
        res.status(req.status).send({data});
    }
    
})

router.get('/Logout',authenticate,(req,res)=>{
    console.log("Logged out");
    res.clearCookie('jwtoken', {path: '/'});
    res.status(200).send("User Logged out");
})

router.get('/SLogout',studentAuthenticate,(req,res)=>{
    console.log("Logged out");
    res.clearCookie('stoken', {path: '/'});
    res.status(200).send("User Logged out");
})

module.exports=router;