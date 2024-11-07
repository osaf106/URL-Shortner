const {getUser} = require('../services/auth')



function checkFromAuthentication(req,res,next)
{
    
    req.user = null;
    const tokenCookie = req.cookies?.token
    if(!tokenCookie ) return next();

    const token = tokenCookie
    const user = getUser(token);
    req.user =user;
    next();
} 



// async function restrictToLoggedinUserOnly(req,res,next)
// {
//     // const userid = req.cookies?.uid;
//     const userid = req.headers['authorization']

//     //console.log(userid)
//     if(!userid) return res.redirect("/login");
//     const token = userid.split('Bearer ')[1]
//     // const user = getUser(userid);
//     const user = getUser(token);
//     if(!user) return res.redirect("/login");


//     req.user = user;
//     console.log(req.user)
//     next();
// }

// async function checkAuth(req,res,next)
// {
//     // const userid = req.cookies?.uid;
//     console.log(req.headers);
//     const userid = req.headers['authorization']
//     console.log("UserId",userid)
//     const token = userid.split('Bearer ')[1]
//     // const user = getUser(userid);
//     const user = getUser(token);




//     req.user = user;
//     console.log("USer",req.user)
//     next();
// }

function restrictTo(roles=[])
{
    return function(req,res,next){

        if(!req.user) return res.redirect("/login")


        if(roles.includes(req.user.role) ) return res.end("Unauthorizw")

            return next();
    };
}
module.exports = {
    checkFromAuthentication,
    restrictTo
    
}