import React, { Component } from 'react';
import { Switch, Route, NavLink } from "react-router-dom";

// components to render 
import Home from './Home'

import Login from './Login'
import LoginClean from './user-components/LoginClean'

import Register from './Register'
import ProjectsList from './ProjectsList'
import ProjectForm from './project-components/Project-Form'
import ProjectDetails from './ProjectDetailPage'
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: null
        }
    }

    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/login`)
    }

    // When Component Renders ( Will)
    componentDidMount() {

        // Check if user is signed in then update state
        axios.get(`${process.env.REACT_APP_API_URL}/checkuser`, { withCredentials: true })
            .then(responseFromTheBackend => {
                console.log("===========================User in APP.JS: ", responseFromTheBackend.data)
                const { userDoc } = responseFromTheBackend.data;
                this.syncCurrentUSer(userDoc);
            })
            .catch(err => console.log("Err while getting the user from the checkuser route: ", err))

    }

    // Save user being signed in in state
    syncCurrentUSer(user) {
        this.setState({ currentUser: user })
    }

    render() {
        const loginRegLink = (

            <ul>
                <li> <NavLink className="navbar-brand" to="/"></NavLink></li>
                <li> <NavLink className="navbar-brand" to="/login"><span className="nav_elements">Login</span> </NavLink></li>
                <li> <NavLink className="navbar-brand" to="/register"> <span className="nav_elements">Register</span></NavLink> </li>
            </ul>

        )

        const userLink = (

            <ul className="navbar-nav">

                <li className="nav-item">
                    <NavLink className="navbar-brand" to="/dashboard">
                        <span className="nav_elements"> Dashboard </span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="navbar-brand" to="/projectForm">
                        <span className="nav_elements"> ProjectForm </span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="navbar-brand" to="/" onClick={this.logOut.bind(this)}>
                        <span className="nav_elements"> Logout </span>
                    </NavLink>
                </li>

            </ul>

        )

        return (

            <div className="App">

                <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-dark">

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarText">

                        <ul className="navbar-nav mr-auto">

                            <li className="nav-item active">
                                <NavLink to="/" className="nav-link"><span className="nav_elements">
                                    <img className="logoIron" src="/2.png" alt="blah" /></span></NavLink>
                            </li>

                        </ul>

                        {/* <span className="navbar-text">{localStorage.usertoken ? userLink : loginRegLink}</span> */}
                        {/* If User is signed in change nav */}
                        <span className="navbar-text">{this.state.currentUser ? userLink : loginRegLink}</span>

                    </div>

                </nav>

                <Switch>
                    <div className="App">

                        <Route exact path="/" component={Home} />

                        <div className="container">

                            <Route exact path="/register" component={Register} />
                            {/* <Route exact path="/login" component={LoginClean} /> */}
                            <Route exact path="/dashboard" component={ProjectsList} />

                            <Route exact path="/projectForm" component={ProjectForm} />

                            <Route exact path="/dashboard/workingproject" component={ProjectDetails} />

                            {/* if we have to pass some props down to a component, we can't use a standard way of rendering using component={},
                                but instead we have to use render = {}  like in the example below */}

                            {/* In render , pass props argument so it can take props
                              * Also pass synccurrentUser function, that will get the signed in user from login component then update user in state here
                             */}
                            <Route exact path="/login" render={props => <LoginClean {...props} onUserChange={userDoc => this.syncCurrentUSer(userDoc)} />} />

                        </div>

                    </div>
                </Switch>

            </div>


        )
    }
}

export default Navbar;