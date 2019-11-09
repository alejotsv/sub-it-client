import React from 'react';
import { Switch, Route, NavLink } from "react-router-dom";

import Signup from "./user-components/Signup";
import Login from "./user-components/Login"
import Home from "./Home";
import ProjectPage from './ProjectDetailPage';
import Project from './Project';
import ProjectsList from './ProjectsList';
import ProjectForm from './project-components/Project-Form';

import axios from "axios";

class navBar extends React.Component {

    constructor() {
        super();
        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
        // the url of backend port we get information from 
        axios.get(`${process.env.REACT_APP_API_URL}/checkuser`, { withCredentials: true })
            .then(responseFromTheBackend => {
                // console.log("User in APP.JS: ", responseFromTheBackend)
                const { userDoc } = responseFromTheBackend.data;
                this.syncCurrentUSer(userDoc);
            })
            .catch(err => console.log("Err while getting the user from the checkuser route: ", err))
    }

    syncCurrentUSer(user) {
        this.setState({ currentUser: user })
    }



    render() {

        return (

            <div >



                <nav>

                    <ul className="navList">

                        <li><NavLink className="link" to="/" > Home </NavLink></li>
                        <li><NavLink className="link" to="/aProjectPage" > ProjectPage </NavLink></li>
                        <li><NavLink className="link" to="/signup-page"> Signup </NavLink></li>
                        <li><NavLink className="link" to="/login"> Login </NavLink></li>
                        <li><NavLink className="link" to="/ProjectsList" > Project List </NavLink></li>
                        <li><NavLink className="link" to="/form" > Project Form </NavLink></li>


                    </ul>
                    {/* If project component needs to be seen individually */}
                    {/* <NavLink to="/Project" > Project Component </NavLink> */}

                </nav>

                <Switch>

                    {/* this is example how we would render component normally */}
                    {/* <Route exact path="/somePage" component={ someComponentThatWillRenderWhenThisRouteIsHit }   /> */}
                    <Route exact path="/" component={Home} />
                    <Route exact path="/aProjectPage" component={ProjectPage} />
                    <Route exact path="/project" component={Project} />
                    <Route exact path="/ProjectsList" render={props => <ProjectsList {...props} theUser={this.state.currentUser} />} />
                    <Route exact path="/form" render={props => <ProjectForm {...props} theUser={this.state.currentUser} />} />


                    {/* if we have to pass some props down to a component,
              we can't use a standard way of rendering using component={},
              but instead we have to use render = {}  like in the example below */}
                    <Route exact path="/signup-page" render={() =>
                        <Signup
                            currentUser={this.state.currentUser}
                            onUserChange={userDoc => this.syncCurrentUSer(userDoc)} //Pass anonymous function that takes and uses userDoc Parameter in syncCurrentUser Function
                        />
                    } />

                    {/* Login component goes here */}
                    <Route exact path="/login" render={props => <Login {...props} onUserChange={userDoc => this.syncCurrentUSer(userDoc)} />} />

                </Switch>


            </div>

        );
    }
}

export default navBar;
