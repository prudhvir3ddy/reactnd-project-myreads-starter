import React, { Component } from "react";

/**
 * after destructing the html into component just took the common things as props and peeked into
 * what kinda object is a book and used props to show this book rather than static mention the details 
 * 
 * regarding this line  value={book.shelf ? book.shelf : "none"} 
 *  
 * i figured out the searchResults are not having shelf inside the book object so if there is no object then none 
 * 
 *   whenShelfMoved = (e) => {
    const shelf = e.target.value;
    const book = this.props.book;
    this.props.onShelfMove(book, shelf);
  };

  this is learned concept from contacts app - pass listeners as props 

  i thought to do network call here but thought it;s best to way operations at one place incase of changes
 */
export default class Book extends Component {
  whenShelfMoved = (e) => {
    const shelf = e.target.value;
    const book = this.props.book;
    this.props.onShelfMove(book, shelf);
  };
  render() {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks ? book.imageLinks.thumbnail : ""
              })`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={this.whenShelfMoved}
              value={book.shelf ? book.shelf : "none"}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {book.title ? book.title : "Not Available"}
        </div>
        <div className="book-authors">
          {book.authors ? book.authors : "Not Available"}
        </div>
      </div>
    );
  }
}
