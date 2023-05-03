const express = require('express')
const app = express()
const connectDB = require('./db/connection')
const pathRouting = require('./router/routes')

app.use(express.json())
app.use('/mens', pathRouting)


const port = process.env.PORT || 8000

const start = async() =>{
  try {
    await connectDB()
    // console.log('Database is connected');
    app.listen(port, ()=>{
      console.log(`Server is listening on port ${port}...`);
    })
    
  } catch (error) {
    console.log(error);
  }
}

start()