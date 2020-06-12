import React, { Component } from "react";
import Shelf from "../components/Shelf";
import * as BooksAPI from "../BooksAPI";
import Fab from "../components/Fab";

/**
 *
 * first thing i did in here is get all books from network and kept in state array
 *
 * then created three <Shelf /> and passed filters with shelf names
 *
 * after working then i compressed three shelfes in one shelf
 *
 * everything worked and one thing needed to implement is moveshelf callback
 *
 * logic i used is take out that book from list and create new shelf and instert again
 *
 * let me know a better way please
 *
 */
export default class Home extends Component {
  state = {
    books: [],
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      //console.log(books);
      this.setState({
        books: books,
      });
    });
  }
  moveShelf = (book, shelf) => {
    var newBooks = this.state.books.filter((b) => {
      return b.id !== book.id;
    });
    book.shelf = shelf;
    newBooks = newBooks.concat(book);
    this.setState({
      books: newBooks,
    });

    BooksAPI.update(book, shelf)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { books } = this.state;
    const shelfNames = ["currentlyReading", "wantToRead", "read"];
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];
    books.map((book) => {
      if (book.shelf === shelfNames[0]) currentlyReading.concat(book);
      else if (book.shelf === shelfNames[1]) wantToRead.concat(book);
      else if (book.shelf === shelfNames[2]) read.concat(book);
    });

    const shelfs = [currentlyReading, wantToRead, read];
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {shelfs.map((name, index) => (
              <Shelf
                key={index}
                name={shelfNames[index]}
                books={name}
                onShelfMove={(book, shelf) => {
                  this.moveShelf(book, shelf);
                }}
              />
            ))}
          </div>
        </div>
        <Fab />
      </div>
    );
  }
}
