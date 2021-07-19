const jwt = require('jsonwebtoken');
const User = require('../models/adminSchema');

const Authenticate = async (req, res, next) => {
    try {
        
        
        const token =req.cookies.jwtoken;
        if(token!=null){
            const verifyToken =await jwt.verify(token,process.env.SECRET_KEY);
            const rootAdmin = await User.findOne({_id : verifyToken._id , "tokens.token":token});

            if(!rootAdmin){
                throw new Error("Admin not found");
            }

            req.token = token;
            req.rootAdmin=rootAdmin;
            req.userId=rootAdmin._id;
        }else{
            res.status(401);
        }
        next();

    } catch (error) {
        console.log(error)
        res.status(401).send("Unauthorized: No token provided");
    }
    
}

module.exports= Authenticate;