const jwt = require('jsonwebtoken');
const Student = require('../models/studentSchema');

const StudentAuthenticate = async (req, res, next) => {
    try {
        
        const token =req.cookies.stoken;
        const verifyToken =await jwt.verify(token,process.env.SECRET_KEY);

        const rootStudent = await Student.findOne({_id : verifyToken._id , "tokens.token":token});

        if(!rootStudent){
            throw new Error("Student not found");
        }

        req.token = token;
        req.rootStudent=rootStudent;
        req.userId=rootStudent._id;

        next();

    } catch (error) {
        console.log(error)
        res.status(401).send("Unauthorized: No token provided");
    }
    
}

module.exports= StudentAuthenticate;