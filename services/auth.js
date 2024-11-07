// state less auth
const jwt = require('jsonwebtoken')
// state full aut
// const sessionidToUserMap = new Map();
const scret = "osafsial@106"
function setUser(user)
{
    // sessionidToUserMap.set(id,user)

    return jwt.sign({
        _id: user._id,
        email: user.email
    },scret)
}

function getUser(token)
{
    if(!token) return null;
    // return sessionidToUserMap.get(id)
    return jwt.verify(token,scret)
}




module.exports = {
    setUser,
    getUser
}