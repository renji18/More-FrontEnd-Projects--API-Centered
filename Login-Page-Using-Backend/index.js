const express = require('express')
const app = express()
const path = require('path')
const bcrypt = require('bcryptjs')
const hbs = require('hbs')
const connectDB = require('./db/connection')
const LoginInfo = require('./models/schema')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const auth = require('./middleware/auth')

app.use(cors({
  origin: 'http://localhost:7000',
  credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const partialsPath = path.join(__dirname, '/partials')

app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.get('/', auth, async (req, res) => {
  try {
    if (req.user) {
      return res.status(200).render('index', {
        USER: req.user.firstName
      })
  } else {
      return res.status(200).render('index')
    }
  } catch (error) {
    return res.status(500).send(error)
  }
})

app.get('/secret', auth, (req, res) => {
  return res.status(200).render('secret')
})

app.get('/logout', auth, async(req, res) => {
  try{
    res.render('logout')
  } catch(err){
    console.log(err);
  }
})

app.get('/logoutSingle', auth, async(req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tokenObject)=>{
      return tokenObject.token !== req.token
    })
    res.clearCookie('jwt')
    await req.user.save()
    return res.render('login')
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get('/logoutAll', auth, async(req, res) => {
  try {
    req.user.tokens = []
    res.clearCookie('jwt')
    await req.user.save()
    return res.render('login')
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get('/register', async (req, res) => {
  res.render('register')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/about', (req, res) => {
  res.render('about')
})


app.post('/register', async (req, res) => {
  try {
    const { pwd } = req.body
    const { cpwd } = req.body
    if (pwd !== cpwd) {
      return res.status(404).render('error', {
        ERROR: 'The passwords don\'t match, please go back'
      })
    }

    const userData = new LoginInfo({
      firstName: req.body.fname,
      lastName: req.body.lname,
      number: req.body.number,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      pwd: pwd,
      confirmpwd: cpwd
    })

    const token = await userData.generateToken()
    await userData.save()

    res.cookie('jwt', token, {
      httpOnly: true,
    })
    
    res.status(201).render('data')

  } catch (error) {
    console.log(error);
    res.status(404).render('error', {
      // ERROR: error
      ERROR: 'All fields not filled correctly, please go back and check again'
    })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { mail } = req.body;
    const { pwd } = req.body;
    const user = await LoginInfo.findOne({ email: mail })

    if (mail !== user.email) {
      return res.status(404).render('error', {
        ERROR: 'Incorrect credentials'
      })
    }

    const isMatch = await bcrypt.compare(pwd, user.pwd)

    const token = await user.generateToken()

    res.cookie('jwt', token, {
      httpOnly: true,
    })

    if (isMatch) {
      return res.status(200).render('index', {
        USER: user.firstName
      })
    } else {
      return res.status(404).render('error', {
        ERROR: 'Incorrect credentials'
      })
    }
  } catch (error) {
    res.status(404).render('register', {
      NEWUSER: 'Email not signed up, you can sign up with this email here'
    })
  }
})

app.get('*', (req, res) => {
  const pageUrl = req.url
  res.render('error', {
    ERROR: `Yo, The page ${pageUrl} is not present, please go back`
  })
})

app.post('*', (req, res) => {
  const pageUrl = req.url
  res.render('error', {
    ERROR: `Yo, The page ${pageUrl}  is not present, please go back`
  })
})



const port = 7000

const start = async () => {
  try {
    await connectDB().then(() => {
      console.log(`Connection to database established`);
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
      })
    }).catch((e) => {
      console.log(e);
    })
  } catch (error) {
    console.log(error);
  }
}

start()