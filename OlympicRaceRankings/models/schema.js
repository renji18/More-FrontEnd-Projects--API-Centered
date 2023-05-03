const mongoose = require('mongoose')

const rankSchema = new mongoose.Schema({

  ranking:{
    type:Number,
    required:true,
    unique:true
  },

  name:{
    type:String,
    required:true,
    trim:true
  },

  dob:{
    type:String,
    required:true,
    trim:true
  },

  country:{
    type:String,
    required:true,
    trim:true
  },

  score:{
    type:Number,
    required:true,
    trim:true
  },

  event:{
    type:String,
    default:'100m',
  }
})

const MensRanking = new mongoose.model('MenRanking', rankSchema)

module.exports = MensRanking