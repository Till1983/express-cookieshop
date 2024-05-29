import express, { request, response } from 'express'

const app = express()
const PORT = 3000

app.get('/', (request, response) => {
    response.send('Welcome to my 🍪 Cookieshop!')
  })

app.get('/contact', (request, response) => {
    response.send('Contact us if you have any questions!')
})

app.post('/contact', (request, response) => {
    response.send('Thank you for getting in touch with us!')
})

app.get('/about', (request, response) => {
    response.send('You can find all sorts of delicacies in our shop. Stay tuned for new items on our menu!')
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

app.listen(PORT , () => {
    console.log(`Started server on ${PORT}`)
})