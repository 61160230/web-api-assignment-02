const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const app = express()

app.use(express.json())
let books = []

const url = 'mongodb+srv://superadmin:020842@cluster0.zkqg0.mongodb.net/Amazon?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
let db, booksCollection

async function connect() {
    await client.connect()
    db = client.db('Amazon')
    booksCollection = db.collection('books')
}
connect()

app.post('/books', async (req, res) => {
    //input
    let newTitle = req.body.title
    let newPrice = req.body.price
    let newUnit = req.body.unit
    let newIsbn = req.body.isbn
    let newImageurl  = req.body.imageurl

    let newBooks = {
        title: newTitle,
        price: newPrice,
        unit: newUnit,
        isbn: newIsbn,
        imageurl : newImageurl
    }
    let booksID = 0

    //process
    const result = await booksCollection.insertOne(newBooks)
    booksID = result.insertedId

    //output

    res.status(201).json(booksID)
})

const port = 3000
app.listen(port,  () => console.log(`Server started at ${port}`))
