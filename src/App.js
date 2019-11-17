import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
// import Prueba from './components/Prueba'
import ProjectsList from './components/ProjectsList'
import Projectform from './components/Project_form';
import Update from './components/Update';
import ProjectDetails from './components/ProjectDetailPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
        <Route exact path="/" component={Home} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route path="/dashboard" component={ProjectsList} />
            <Route path="/project" component={ProjectDetails} />
            <Route path="/update" component={Update} />
            <Route exact path="/form" component={Projectform} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App

