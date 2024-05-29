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

app.listen(PORT , () => {
    console.log(`Started server on ${PORT}`)
})