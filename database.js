const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

//Creating table named books with four columns and inserting data into it. 
db.serialize(() => {
  db.run('CREATE TABLE books (name TEXT, genre TEXT, date DATE, author TEXT)')

  db.run("INSERT INTO books (name, genre, date, author) VALUES ('Book1', 'Science fiction', '2020-01-01', 'Fenix Kanat'),('Book2', 'Fantasy', '2021-01-01', 'Alice Williams'),('Book3', 'True Crime', '2022-01-01', 'Edward Woo'),('Book4', 'Horror', '2023-01-01', 'Melinda Eliasson')");
})

//getBooks function that will allow the user to see all the books in the database
//It is made available to other JS file using module.exports.function...
module.exports.getBooks = function () {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM books', (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

//getBook function takes book name as parameter and will return specifically required book.
//Is being available to other files through using module.exports.function
module.exports.getBook = function (name) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM books WHERE name= "${name}" limit 1`, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
}

