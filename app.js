import express, { request, response } from 'express'
import { logger } from './middlewares/logger.js'
import { readablePrice } from './helpers/cookie-views.js'
import { Cookie } from './models/cookies.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL)
    .then(() => console.log('Database connected'))
    .catch(error => console.log(error))

app.set('view engine', 'ejs')

app.use(logger)
app.use('/assets', express.static('public'))
app.use(express.urlencoded({extended: true}))

const cookies = [
    { name: 'Chocolate Chip', slug: 'chocolate-chip', description: 'A tasty, sugary cookie, filled with chocolate chips', priceInCents: 350, isInStock: true},
    { name: 'Banana', slug: 'banana', description: 'A cookie with wonderful banana flavour',priceInCents: 300, isInStock: true}
]

app.get('/', (request, response) => {
    const cookiesInStock = 400
    response.render('index', {cookiesInStock: cookiesInStock})
  })

app.get('/contact', (request, response) => {
    response.send('<h1>Get in touch</h1><p>Contact us if you have any questions!</p>')
})

app.post('/contact', (request, response) => {
    console.log('Contact form submission: ', request.body)
    response.send('<h2>Message sent!</h2><p>Thank you for getting in touch with us!</p>')
})

app.get('/about', (request, response) => {
    response.send('<h1>About</h1><p>You can find all sorts of delicacies in our shop. Stay tuned for new items on our menu!</p>')
})

app.get('/search', (request, response) => {
    const query = request.query.q
    response.send(`You searched for: ${query}`)
})

app.get('/hello', (request, response) => {
    const name = 'Joe'
    const fakeVisitorNumber = '340'
    response.send(`<h1>Hello ${name}!</h1> <p>You are visitor number ${fakeVisitorNumber}</p>`)
})

app.get('/calculate', (request, response) => {
    let num1 = 23
    let num2 = 45
    const average = (num1 + num2) / 2
    response.send(`<h3>The average of number ${num1} and ${num2} is ${average}.</h3>`)
})

app.get('/cookies', (request,response) => {
    console.log(request.query)
    response.render('cookies/index', { 
        cookies: cookies,
        readablePrice: readablePrice 
    })
})

app.get('/cookies/new', (request, response) => {
    response.render('cookies/new')
  })

app.get('/cookies/:slug', (request, response) => {
    const cookiesSlug = request.params.slug;
    const cookieOffering = cookies.find(cookie => cookie.slug === cookiesSlug);

    if (cookieOffering) {
        response.render('cookies/cookie-detail', {
            cookie: cookieOffering,
            readablePrice: readablePrice
        });
    } else {
        response.status(404).send('Cookie not found');
    }
})

app.post('/create-cookie', async (request, response) => {
    try {
      const cookie = new Cookie({
        slug: request.body.slug,
        name: request.body.name,
        description: request.body.description,
        priceInCents: request.body.priceInCents
      })
      await cookie.save()
  
      response.send('Cookie Created')
    }catch (error) {
      console.error(error)
      response.send('Error: The cookie could not be created.')
    }
  })


export { app }

app.listen(PORT , () => {
    console.log(`Started server on ${PORT}`)
})