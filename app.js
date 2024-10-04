require ('dotenv').config()
// async error
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const notFoundMiddlerware = require('./middlerware/not-found')
const errorHandlerMiddlerware = require('./middlerware/error-handler')


// middlerware 
app.use(express.json())


// routes 

app.get('/', (req, res) => {
    res.send('<h1> Store API </h1><a href="/api/v1/products">Products route</a>')
})

app.use('/api/v1/products', productsRouter)

// produtes routes 

app.use(notFoundMiddlerware);
app.use(errorHandlerMiddlerware);

const port = process.env.PORT || 3000

const start = async () => {
    try {
        // connectDB
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server is listening port ${port}......`));
    }catch(error){
        console.log(error)

    }
}
start()