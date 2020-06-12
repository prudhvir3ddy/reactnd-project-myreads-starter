import React, { Component } from "react";
import Book from "./Book";

/**
 * just destructuring and nothing fancy it needed a key as list, need to pass book details
 *
 * and onShelfMove coming from parent to listen
 */
export default class Shelf extends Component {
  render() {
    const { name, books, onShelfMove } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book key={book.id} book={book} onShelfMove={onShelfMove} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
