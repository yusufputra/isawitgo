const jwt = require('jsonwebtoken');

require('dotenv').config();



//please be carefull , dont pass your token with "" , 
//otherwise it will make you unathorized.
function checkToken(req,res,next){
    console.log('check auth')
    const authHeader = req.get('authorization');
    if (authHeader){
        jwt.verify(authHeader,process.env.TOKEN_SECRET,(err,user)=>{
            if (err){
                res.status(500 ).json("Server Error");
            }
            else{
                req.user=user;
                next();
            }
        })
    }
    else{
        next();
    }
    }

    function isLoggedIn(req, res, next) {
        console.log(req.user);
        if (req.user) {
          next();
        } else {
          const error = new Error('Unauthorized');
          res.status(401);
          next(error);
        }
      }
      
  


module.exports={
    checkToken,isLoggedIn
}