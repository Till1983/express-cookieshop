import express, { request, response } from 'express'
import { logger } from './middlewares/logger.js'

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')

app.use(logger)
app.use('/assets', express.static('public'))
app.use(express.urlencoded({extended: true}))

app.get('/', (request, response) => {
    response.render('index')
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
    response.send(`
        <h1>Cookies</h1>
        <p>Here you will find all the cookies!"</p>
        <ul>
            <li>Chocolate Chip</li>
            <li>Banana</li>
        </ul>
    `)
})

app.get('/cookies/:slug', (request, response) => {
    const cookiesId = request.params.slug
    response.send(`<h3>You chose the cookie with the ID ${cookiesId}.</h3>`)
})

app.listen(PORT , () => {
    console.log(`Started server on ${PORT}`)
})