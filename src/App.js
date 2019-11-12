import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import NavbarClean from './components/NavbarClean'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
// import Prueba from './components/Prueba'
import ProjectsList from './components/ProjectsList'

import ProjectForm from './components/project-components/Project-Form'

// import Project_form from './components/Project_form';
// import Home from './components/Home';
import ProjectDetails from './components/ProjectDetailPage';

class App extends Component {
  render() {
    return (

      // <Router>
      //   <div className="App">
      //     <Navbar />
      //     <Route exact path="/" component={Home} />
      //     <div className="container">
      //       <Route exact path="/register" component={Register} />
      //       <Route exact path="/login" component={Login} />
      //       <Route path="/dashboard" component={ProjectsList} />

      //       <Route path="/projectForm" component={ProjectForm} />

      //       <Route path="/dashboard/workingproject" component={ProjectDetails} />
      //       {/* <Route exact path="/project" component={Project_form} /> */}
      //     </div>
      //   </div>
      // </Router>

      <NavbarClean />
     


    )
  }
}

export default App
