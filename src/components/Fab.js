import React, { Component } from "react";
import { Link } from "react-router-dom";

/**
 * just figured that adding link inside div works. reviewer please explain about it.
 *
 * i was thinking something like button onCLick = <Link /> need to happen
 */
export default class Fab extends Component {
  render() {
    return (
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    );
  }
}
