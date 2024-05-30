import express, { request, response } from 'express'
import { logger } from './middlewares/logger.js'

const app = express()
const PORT = 3000

app.use(logger)
app.use('/assets', express.static('public'))
app.use(express.urlencoded({extended: true}))

app.get('/', (request, response) => {
    response.send('Welcome to my 🍪 Cookieshop!')
  })

app.get('/contact', (request, response) => {
    response.send('Contact us if you have any questions!')
})

app.post('/contact', (request, response) => {
    console.log('Contact form submission: ', request.body)
    response.send('Thank you for getting in touch with us!')
})

app.get('/about', (request, response) => {
    response.send('You can find all sorts of delicacies in our shop. Stay tuned for new items on our menu!')
})

app.get('/search', (request, response) => {
    const query = request.query.q
    response.send(`You searched for: ${query}`)
})

app.get('/hello', (request, response) => {
    const name = 'Joe'
    const fakeVisitorNumber = '340'
    response.send(`Hello ${name}! You are visitor number ${fakeVisitorNumber}`)
})

app.get('/calculate', (request, response) => {
    let num1 = 23
    let num2 = 45
    const average = (num1 + num2) / 2
    response.send(`The average of number ${num1} and ${num2} is ${average}.`)
})

app.get('/cookies', (request,response) => {
    console.log(request.query)
    response.send('Great cookies here!')
})

app.get('/cookies/:slug', (request, response) => {
    const cookiesId = request.params.slug
    response.send(`You chose the cookie with the ID ${cookiesId}.`)
})

app.listen(PORT , () => {
    console.log(`Started server on ${PORT}`)
})