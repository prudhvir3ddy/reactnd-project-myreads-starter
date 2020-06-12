import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksApi from "../BooksAPI";
import Book from "../components/Book";

/**
 * to be honest this search took me to apply the brain
 *
 * after creating component with the html from main page, now i have to make sure input works
 *
 * from contact app lesson i need to make it controlled component also it is reactive so i used setstate in here for input field value
 *
 * TODO: for the api call i think something like debounce need to be implemented.
 *
 * searchResults are working after demanding some edges and i added if else to it and i added a map operator to iterate on them and passed to <Book />
 *
 * here i faced little confusion on how to pass the moveShelf slowly figured out that if we add shelf as network call then coming back will be enough
 *
 * in home page as it fetches from networkk: i was like can't we do something like cache here
 *
 * i had to also update books state as that is acting as dependency for searchResults to show the current state of it's menu
 *
 * books coming from getAll will have a shelf and coming from search resuts are not having so i have to add if searchresults item is already in books then
 *
 *
 */
export default class Search extends Component {
  state = {
    query: "",
    searchResults: [],
    books: [],
  };

  componentDidMount() {
    BooksApi.getAll().then((res) => {
      this.setState({ books: res });
    });
  }

  moveShelf = (book, shelf) => {
    BooksApi.update(book, shelf).then((res) => {
      book.shelf = shelf;
      this.setState({
        books: this.state.books.filter((b) => b.id !== book.id).concat([book]),
      });
    });
  };
  handleChange = (event) => {
    const newQuery = event.target.value.trimStart();
    this.setState({
      query: newQuery,
    });

    if (newQuery) {
      BooksApi.search(newQuery)
        .then((res) => {
          if (!res.error) {
            res.forEach((resItem) => {
              let item = this.state.books.filter((b) => b.id === resItem.id);
              if (item[0]) {
                resItem.shelf = item[0].shelf;
              }
            });
            this.setState({
              searchResults: res,
            });
          } else {
            this.setState({
              searchResults: [],
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({
        searchResults: [],
      });
    }
  };

  render() {
    const { query, searchResults } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults &&
              searchResults.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  onShelfMove={(book, shelf) => this.moveShelf(book, shelf)}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}
