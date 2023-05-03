const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const connectDB = () =>{
  return mongoose.connect('mongodb://localhost:27017/olympics')
    .then(()=>console.log(`Database Connected`))
    .catch((e)=>console.log(e))
}

module.exports = connectDB