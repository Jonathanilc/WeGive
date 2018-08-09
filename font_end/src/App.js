import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import '../node_modules/react-bootstrap/dist/react-bootstrap';

import {BrowserRouter,Route,Switch} from 'react-router-dom';
  
import FetchFromDB from '../src/components/fetchFromDB/fetchFromDB';
import DisplayFromDB from '../src/components/displayFromDB/displayFromDB';


class App extends Component {
  state = {
    products: [],
    product:{
      name: 'sample product',
      price: 20
    }
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1> 
        </header>
        
      <BrowserRouter>
        <Switch>
          <Route path = '/' exact component = {DisplayFromDB} />
          <Route path = '/add' component = {FetchFromDB} />
        </Switch>

        
        
      </BrowserRouter>
      
    
    </div>
    )
  }
}

export default App;


