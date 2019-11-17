import React, { Component } from 'react';
import { Switch, Route, NavLink } from "react-router-dom";

// components to render 
import Home from './Home'

import LoginClean from './user-components/LoginClean'
import ProjectsListAlex from './project-components/ProjectsListpp'
import ProjectForm from './project-components/Project-Form'
import LandingPage from './LandingPage'
import ProjectPage from './project-components/ProjectPage'

import Login from './Login'
import ProjectsList from './ProjectsList'
import ProjectDetails from './ProjectDetailPage'
import Register from './Register'

import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: null
        }
    }

    // When Component Renders
    componentDidMount() {

        // Check if user is signed in then update state
        axios.get(`${process.env.REACT_APP_API_URL}/checkuser`, { withCredentials: true })
            .then(responseFromTheBackend => {
                // console.log("===========================User in APP.JS: ", responseFromTheBackend.data)
                const { userDoc } = responseFromTheBackend.data;
                this.syncCurrentUSer(userDoc);
            })
            .catch(err => console.log("Err while getting the user from the checkuser route: ", err))

    }

    // Save user being signed in in state
    syncCurrentUSer(user) {
        this.setState({ currentUser: user })
    }

    // Logout user being signed in in state
    logOut() {

        // Check if user is signed in then update state
        axios.post(`${process.env.REACT_APP_API_URL}/logout`, { withCredentials: true })
            .then(responseFromTheBackend => {
                console.log("===========================I HAVE LOGGED OUT USER ");
                // const { userDoc } = responseFromTheBackend.data;
                // this.syncCurrentUSer(userDoc);
                this.setState({
                    currentUser: null
                })

                this.props.history.push(`/login`)
            })
            .catch(err => console.log("Err while logging out the user from the logout route route: ", err))

    }

    render() {
        const loginRegLink = (

            <ul>
                <li> <NavLink className="navbar-brand" to="/"></NavLink></li>
                <li> <NavLink className="navbar-brand" to="/login"><span className="nav_elements">Login</span> </NavLink></li>
                <li> <NavLink className="navbar-brand" to="/register"> <span className="nav_elements">Register</span></NavLink> </li>

                <li> <NavLink className="navbar-brand" to="/land"> <span className="nav_elements">Land</span></NavLink> </li>

            </ul>

        )

        const userLink = (

            <ul className="navbar-nav">

                <li className="nav-item">
                    <NavLink className="navbar-brand" to="/projectForm/">
                        <span className="nav_elements"> Upload A Project </span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="navbar-brand" to="/user-dashboard">
                        <span className="nav_elements"> Dashboard </span>
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
                        <Route exact path="/land" component={LandingPage} />

                        <div className="container">

                            {/* if we have to pass some props down to a component, we can't use a standard way of rendering using component={},
                                but instead we have to use render = {}  like in the example below */}

                            {/* In render , pass props argument so it can take props
                              * Also pass synccurrentUser function, that will get the signed in user from login component then update user in state here
                             */}

                            <Route exact path="/register" render={props => <Register {...props} onUserChange={userDoc => this.syncCurrentUSer(userDoc)} />} />
                            <Route exact path="/login" render={props => <LoginClean {...props} onUserChange={userDoc => this.syncCurrentUSer(userDoc)} />} />

                            <Route exact path="/projectForm/" render={props => <ProjectForm {...props} theUser={this.state.currentUser} />} />
                            <Route exact path="/user-dashboard" render={props => <ProjectsListAlex {...props} theUser={this.state.currentUser} />} />
                            <Route exact path="/projectwork" render={props => <ProjectPage {...props} theUser={this.state.currentUser} />} />

                        </div>

                    </div>

                </Switch>

            </div>

        )
    }
}

export default Navbar;