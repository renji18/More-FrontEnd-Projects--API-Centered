const express = require('express');
const app = express();
const tasks = require('./Routes/tasks.js')
const connectDB = require('./DB/connect')
require('dotenv').config()
const notFound = require('./Middleware/not-found')
const errorHandler = require('./Middleware/error-handler')

//middleware
app.use(express.json())
app.use(express.static('./public'))

//routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandler)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(5000, () => {console.log(`Server is listening on port 5000...`)})
  } catch (error) {
    console.log(error);
  }
} 

start()