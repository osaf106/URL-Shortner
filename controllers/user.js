
const USER = require('../models/user')
const{v4: uuidv4} = require('uuid');
const {setUser} = require('../services/auth')

async function handleUserSignup(req,res)
{
    const {name, email, password} = req.body;
    console.log(req.body)
    if (!req.body) {
        return res.status(400).render( 'signup', {error: "Eachfield is required" });
      }
    await USER.create({
        name,
        email,
        password,
    })
    return res.redirect('/')
    
}
async function handleUserLogin(req,res)
{
    const {email, password} = req.body;
    console.log(req.body)
    if (!req.body) {
        return res.status(400).render( 'signup', {error: "Each field is required" });
      }
    const activeUser = await USER.findOne({
        email,
        password,
    })
    // console.log(activeUser)
    req.user = activeUser;
    console.log(req.user);
    if(!activeUser) return res.render('login',{
        error: "Invalid User or password"
    })
    // const sessionid = uuidv4();
    
    const token = setUser(activeUser)
    res.cookie('uid',token);
    console.log(req.user);
    return res.render('home')
    // return res.json({token: token})

   
}

module.exports = {handleUserSignup,handleUserLogin}