const express = require ('express')
const connectDB = require('./config/Db')

const app = express()

//connect Database
connectDB()

//init middleware
//this will allow us to get data in the request.body
app.use(express.json({extended:false}))

app.get('/', (req,res) => res.send("api running"))

//defined root Routes and required path
app.use('/api/users', require('./Routes/api/users'))
app.use('/api/auth', require('./Routes/api/auth'))
app.use('/api/profile', require('./Routes/api/profile'))
app.use('/api/posts', require('./Routes/api/post'))
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})