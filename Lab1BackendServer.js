const express = require ('express')
const app = express()
const {getBooks, getBook} = require('./database.js')


app.get('/', (req, res) => {
    res.send("Server is running!")
})

//Route 1, The Welcome Route, will show
//Links will show up that are related to other routes
app.get('/Welcome', (req, res) => {
    let links = '<a href="http://localhost:4000/books">Click here to visit all of our books in our database</a><br>'
    links += '<a href="http://localhost:4000/book/Book1">Click here to view the first book in our database</a><br>'
    links += '<a href="http://localhost:4000/book/Book2">Click here to view the second book in our database</a><br>'
    links += '<a href="http://localhost:4000/book/Book3">Click here to view the third book in our database</a><br>'
    links += '<a href="http://localhost:4000/book/Book4">Click here to view the fourth book in our database</a><br>'
    res.send("Welcome to our book store, here are some options for you :) <br> " + links)
})

// Route 2, Waits for getBooks function to complete
// The result is stored in constant var "books"
// Try and catch for error handling
app.get('/books', async (req, res) => {
    try {
        const books = await getBooks()
        res.json(books)
    }catch (error) {
        res.json({error: error.message})
    }
})

//Route 3, checks if the required name exists, if so, stores it in a variable with same name. 
// Try and catch for error handling. 
app.get('/book/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const book = await getBook(name)
        if(book){
            res.json(book)
        }else{
            res.json({error: 'Book Not Found'})
        }
    }catch (error) {
        res.json({error: error.message})
    }
})

app.listen(4000, () => {
    console.log("Server listening" + 4000);
})



