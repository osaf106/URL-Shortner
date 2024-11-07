const {nanoid} = require('nanoid');
const URL = require('../models/url')





async function handleGenerateNewURL(req,res){
    const body = req.body;
    console.log(req.user._id)
    if(!body.url) return res.status(400).json({error:"URL is requires"})
    const shortId=nanoid(8);
    await URL.create(
        {
            shortID: shortId,
            orignalURL: body.url,
            totalClicks:[],
            craetedBy: req.user._id
        }
    )
    console.log(shortId)
    return res.render("home",{id: shortId})
}

async function handleAnalyticClicks(req,res){
    const shortID = req.params.shortID;
    if(!shortID) return res.status(400).json({error:"shortId is requires"})
    
    const result = await URL.findOne({shortID});
    console.log(result);
    
    return res.json({id: `Your ID is ${shortID}`, totalClicks: result.totalClicks.length})
}













module.exports ={
    handleGenerateNewURL,
    handleAnalyticClicks
}