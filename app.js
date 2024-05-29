import express from 'express'

const app = express()
const PORT = 3000

app.listen(PORT , () => {
    console.log(`Started server on ${PORT}`)
})

app.get('/', (request, response) => {
    response.send('Welcome to my 🍪 Cookieshop!')
  })