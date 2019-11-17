import React, { Component } from 'react'
import './App.css';

// THIS IS FOR MOCK UP , MUST ALSO DELETE SWITCH ROUTER BELOW AND USE NAVBAR CLEAN
import './AppCopy.css' ;  

import NavbarClean from './components/NavbarClean'
import NavbarStyled from './components/NavbarCSSd'
import Home from './components/Home'
import LoginClean from './components/user-components/LoginClean'
import Register from './components/Register'

import Header from './components/header'

import ProjectsListAlex from './components/project-components/ProjectsListpp'

import ProjectForm from './components/project-components/Project-Form'
import LandingPage from './components/LandingPage'


import { Switch, Route, NavLink } from "react-router-dom";

import ProjectDetails from './components/ProjectDetailPage';

class App extends Component {
  render() {
    return (

      <div>

        {/* For mockup */}
        <NavbarClean />

        {/* Persistant Navbar */}
        {/* <NavbarStyled /> */}

        {/* <Header/> */}

      </div>


    )
  }
}

export default App
