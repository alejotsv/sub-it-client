import React from 'react'
// import { Link, withRouter } from 'react-router-dom'

import { Switch, Route, NavLink, BrowserRouter as Router } from "react-router-dom";
// import { BrowserRouter as Router, Route } from 'react-router-dom'

// import Prueba from './components/Prueba'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ProjectDetails from './ProjectDetailPage';
import ProjectsList from './ProjectsList'

import ProjectForm from './project-components/Project-Form'

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

class Navbar extends React.Component {
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

        let userLink = (

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

        {/* loginRegLink list in carlos */ }
        let loginRegLink = (

            <ul>
                <li> <NavLink className="navbar-brand" to="/"></NavLink></li>
                <li> <NavLink className="navbar-brand" to="/login"><span className="nav_elements">Login</span> </NavLink></li>
                <li> <NavLink className="navbar-brand" to="/register"> <span className="nav_elements">Register</span></NavLink> </li>
            </ul>

        )


        return (

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

                {/* Router and Switch */}
                <Switch>

                    {/* this is example how we would render component normally */}
                    {/* <Route exact path="/somePage" component={ someComponentThatWillRenderWhenThisRouteIsHit }   /> */}
                    {/* <Route exact path="/" component={Home} />
                    <Route exact path="/aProjectPage" component={ProjectPage} />
                    <Route exact path="/project" component={Project} /> */}


                    {/* Carlos Routes */}

                    <Switch>
                        <div className="App">
                            {/* Do I need this ? <Navbar /> */}
                            <Route exact path="/" component={Home} />
                            <div className="container">
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/dashboard" component={ProjectsList} />

                                <Route exact path="/projectForm" component={ProjectForm} />

                                <Route exact path="/dashboard/workingproject" component={ProjectDetails} />
                                {/* <Route exact path="/project" component={Project_form} /> */}
                            </div>
                        </div>
                    </Switch>




                    {/* THIS MINE if we have to pass some props down to a component,
              we can't use a standard way of rendering using component={},
              but instead we have to use render = {}  like in the example below */}
                    {/* <Route exact path="/signup-page" render={() =>

                        <Signup
                            currentUser={this.state.currentUser}
                            onUserChange={userDoc => this.syncCurrentUSer(userDoc)} //Pass anonymous function that takes and uses userDoc Parameter in syncCurrentUser Function
                        />
                    } />

                    <Route exact path="/ProjectsList" render={props => <ProjectsList {...props} theUser={this.state.currentUser} />} />
                    <Route exact path="/form" render={props => <ProjectForm {...props} theUser={this.state.currentUser} />} />

                    {/* Login component goes here */}
                    {/* <Route exact path="/login" render={props => <Login {...props} onUserChange={userDoc => this.syncCurrentUSer(userDoc)} />} /> */} */}

                </Switch>

            </nav>




        )
    }
}

// export default withRouter(Navbar)
export default Navbar;





// import React from 'react';
// import { Switch, Route, NavLink } from "react-router-dom";

// import Signup from "./user-components/Signup";
// import Login from "./user-components/Login"
// import Home from "./Home";
// import ProjectPage from './ProjectDetailPage';
// import Project from './Project';
// import ProjectsList from './ProjectsList';
// import ProjectForm from './project-components/Project-Form';

// import axios from "axios";

// class navBar extends React.Component {

//     constructor() {
//         super();
//         this.state = {
//             currentUser: null
//         }
//     }

//     componentDidMount() {
//         // the url of backend port we get information from 
//         axios.get("http://localhost:3001/api/checkuser", { withCredentials: true })
//             .then(responseFromTheBackend => {
//                 // console.log("User in APP.JS: ", responseFromTheBackend)
//                 const { userDoc } = responseFromTheBackend.data;
//                 this.syncCurrentUSer(userDoc);
//             })
//             .catch(err => console.log("Err while getting the user from the checkuser route: ", err))
//     }

//     syncCurrentUSer(user) {
//         this.setState({ currentUser: user })
//     }



//     render() {

//         return (

//             <div >



//                 <nav>

//                     <ul className="navList">

//                         <li><NavLink className="link" to="/" > Home </NavLink></li>
//                         <li><NavLink className="link" to="/aProjectPage" > ProjectPage </NavLink></li>
//                         <li><NavLink className="link" to="/signup-page"> Signup </NavLink></li>
//                         <li><NavLink className="link" to="/login"> Login </NavLink></li>
//                         <li><NavLink className="link" to="/ProjectsList" > Project List </NavLink></li>
//                         <li><NavLink className="link" to="/form" > Project Form </NavLink></li>


//                     </ul>
//                     {/* If project component needs to be seen individually */}
//                     {/* <NavLink to="/Project" > Project Component </NavLink> */}

//                 </nav>

//                 <Switch>

//                     {/* this is example how we would render component normally */}
//                     {/* <Route exact path="/somePage" component={ someComponentThatWillRenderWhenThisRouteIsHit }   /> */}
//                     <Route exact path="/" component={Home} />
//                     <Route exact path="/aProjectPage" component={ProjectPage} />
//                     <Route exact path="/project" component={Project} />
//                     <Route exact path="/ProjectsList" render={props => <ProjectsList {...props} theUser={this.state.currentUser} />} />
//                     <Route exact path="/form" render={props => <ProjectForm {...props} theUser={this.state.currentUser} />} />


//                     {/* if we have to pass some props down to a component,
//               we can't use a standard way of rendering using component={},
//               but instead we have to use render = {}  like in the example below */}
//                     <Route exact path="/signup-page" render={() =>
//                         <Signup
//                             currentUser={this.state.currentUser}
//                             onUserChange={userDoc => this.syncCurrentUSer(userDoc)} //Pass anonymous function that takes and uses userDoc Parameter in syncCurrentUser Function
//                         />
//                     } />

//                     {/* Login component goes here */}
//                     <Route exact path="/login" render={props => <Login {...props} onUserChange={userDoc => this.syncCurrentUSer(userDoc)} />} />

//                 </Switch>


//             </div>

//         );
//     }
// }

// export default navBar;
