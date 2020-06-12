import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Route, Switch } from "react-router-dom";
import Search from "./pages/Search";

/**
 *
 * first thing i did is to clear html into different components i learned how to do that
 * in this video  https://www.youtube.com/watch?v=bpKI3R0nf7E (project html to component restructuring )
 *
 * next thing is i need to make sure the routes work to go to different components with react-router-dom 
 * 
 * there are two options for me in Route either use component if there are no props if there are props use render 
 * 
 * now return will take only one root element i was not to sure if i have to do this way 
 * 
 * <div>
 *         <Route exact path="/" component={Home} />
           <Route exact path="/search" component={Search} />
  *    </div>

  * after searching in google i found <Switch></Switch> https://stackoverflow.com/questions/45122800/react-router-switch-behavior  
 */
export default class BooksApp extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
      </Switch>
    );
  }
}
