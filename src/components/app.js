import React, { Component } from 'react';
import moment from "moment";

// own components
import PortfolioContainer from './portfolio/portfolio-container'
import NavigationContainer from './navigation/navigationContainer'

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        < NavigationContainer />
        <h1>Joshua Hunters Portfolio</h1>
        <div>{moment().format('MMMM Do YYYY, h:mm:ss a')}</div>
        <PortfolioContainer/>
      </div>
    );
  }
}
