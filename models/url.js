const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortID:{
        type: String,
        required: true,
        unique: true
    },
    orignalURL:{
        type: String,
        required: true,
        unique: true
    },
    totalClicks:[
        {
            timestamp:{ type: Number},
            clicks: {type:Number},
            
        }
    
    ],
    craetedBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true})

const model = mongoose.model('URL',urlSchema)

module.exports = model;