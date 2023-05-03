const express = require('express')
const app = express()
const router = require('./router')


app.use(express.json())

// can have multiple static files with different statements
// we can also specify for a particular route where the static files will be available using two parameters and specifying a route
app.use('/static', express.static('./public'))

app.get('/', (req, res)=>{
  res.send(`hello world!`)
})

app.get('/users/:userID/books/:bookID', (req, res) => {
  res.send(req.params)
})

app.post('/', (req, res)=>{
  res.json(req.body).status(201)
})

// if we have two get methods for the same url, only the first one will be executed and the other one will be ignored
app.get('/example/a', (req, res) => {
  res.send(`The response will be send by another method`)
})

app.get('/example/a', (req, res) => {
  res.send(`Hello from a!`)
})

// we can only have one response in a method. If there are multiple res.send in a single route response, then we'll see the first response and then the site will crash
app.get('/example/b', (req, res, next) => {
  console.log(`The response will be sent by next request`);
  next()
}, (req, res)=> {
  res.send(`Hello from b!`)
})


// we can do routing by using the Router class or by using the route method available on app.

app.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post((req, res) => {
    res.send('Add a book')
  })
  .put((req, res) => {
    res.send('Update the book')
  })

// using router module
app.use('/birds', router)


// using middleware
const myMiddlewareWorking = (req, res, next) => {
  res.send('Middleware working')
  next()
}
app.use('/middleware', myMiddlewareWorking)

const myMiddlewareTime = (req, res, next) => {
  req.requestTime = Date.now()
  next()
}
app.use(myMiddlewareTime)

app.get('/time', (req, res, next) => {
  const responseText = `Requested at ${req.requestTime}`
  res.send(responseText)
})


const port = 3000
app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`);
})