import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
// import Prueba from './components/Prueba'
import ProjectsList from './components/ProjectsList'
// import Project_form from './components/Project_form';
// import Home from './components/Home';
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
            <Route path="/dashboard/workingproject" component={ProjectDetails} />
            {/* <Route exact path="/project" component={Project_form} /> */}
          </div>
        </div>
      </Router>
    )
  }
}

export default App

// import React from 'react';
// import './App.css';

// import Navbar from './components/Navbar';



// class App extends React.Component {


//   render() {



//     return (
//       <div >

//         <Navbar />

  
//       </div>
//     );
//   }
// }

// export default App;

// import React from 'react';
// import './App.css';

// import Navbar from './components/Navbar';



// class App extends React.Component {


//   render() {



//     return (
//       <div >

//         <Navbar />

  
//       </div>
//     );
//   }
// }

// export default App;
