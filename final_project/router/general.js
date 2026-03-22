const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Task 10: Get the book list available in the shop using async-await
public_users.get('/', async function (req, res) {
  try {
    const get_books = new Promise((resolve, reject) => {
      resolve(books);
    });
    const bookList = await get_books;
    res.send(JSON.stringify(bookList, null, 4));
  } catch (error) {
    res.status(500).send("Error fetching book list");
  }
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  })
  .then((book) => res.send(JSON.stringify(book, null, 4)))
  .catch((err) => res.status(404).send(err));
});
  
// Task 12: Get book details based on author using async-await
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const get_books_by_author = new Promise((resolve, reject) => {
      let results = [];
      for (let id in books) {
        if (books[id].author === author) {
          results.push(books[id]);
        }
      }
      resolve(results);
    });
    const results = await get_books_by_author;
    res.send(JSON.stringify(results, null, 4));
  } catch (error) {
    res.status(500).send("Error fetching books by author");
  }
});

// Task 13: Get all books based on title using async-await
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    const get_books_by_title = new Promise((resolve, reject) => {
      let results = [];
      for (let id in books) {
        if (books[id].title === title) {
          results.push(books[id]);
        }
      }
      resolve(results);
    });
    const results = await get_books_by_title;
    res.send(JSON.stringify(results, null, 4));
  } catch (error) {
    res.status(500).send("Error fetching books by title");
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
