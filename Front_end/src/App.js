import React, { Component } from 'react';

import './App.css';

import '../node_modules/react-bootstrap/dist/react-bootstrap';

import {BrowserRouter} from 'react-router-dom';
  

import Navbar from '../src/components/Navigation/Navbar/Navbar'
class App extends Component {
  state = {
  }

  render() {
    return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar></Navbar>
      </BrowserRouter>
    
    </div>
    )
  }
}

export default App;


