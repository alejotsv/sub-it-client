import React, { Component } from 'react'
import './App.css';

import Navbar from './components/user-components/LoginClean'

class App extends Component {
  render() {
    return (

      <div>

        {/*  Navbar Contains switch with all routes and paths */}
        <Navbar />

      </div>

    )
  }
}

export default App
