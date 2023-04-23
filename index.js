const express = require('express')
const app = express()
const PORT = process.env.PORT  || 8000
const cors = require('cors')
const UserRoute = require('./src/Router/UserRouter')
const BookRoute = require('./src/Router/BookRouter')
require('./src/db/conn')
app.use(cors())
app.use(express.json())

app.use('/api/user',UserRoute)
app.use('/api/book',BookRoute)
app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})