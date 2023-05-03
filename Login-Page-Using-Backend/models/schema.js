const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    trim:true
  },

  lastName:{
    type:String,
    required:true,
    trim:true
  },

  number:{
    type:Number,
    required:true,
    validate(value){
      if(value.toString().length !== 10){
        throw new Error('Number not valid')
      }
    }
  },

  email:{
    type:String,
    required:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Bro, provide a valid email')
      }
    }
  },

  age:{
    type:Number,
    required:true,
    validate(value){
      if(value < 1){
        throw new Error(`How the hell are you even able to fill the form at the age of ${value}`)
      }
    }
  },

  gender:{
    type:String,
    required:true,
  },

  pwd:{
    type:String,
    required:true,
  },

  confirmpwd:{
    type:String,
    required:true,
  },

  tokens:[{
    token:{
      type:String, 
      required:true,
    }
  }]

})

loginSchema.methods.generateToken = async function(){
  try {
    const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({token}) // destructured {token:token}
    await this.save()
    return token
  } catch (error) {
    res.send('error part in token generation')
  }
}

loginSchema.pre("save", async function(next){
  if(this.isModified("pwd")){
    this.pwd = await bcrypt.hash(this.pwd, 10)
    this.confirmpwd = await bcrypt.hash(this.pwd, 10)
  }
  next()
})

const LoginInfo = new mongoose.model('LoginData', loginSchema)

module.exports = LoginInfo