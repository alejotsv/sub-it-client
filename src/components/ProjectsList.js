import React, { Component } from 'react';
import axios from 'axios';
import '../ProjectStyles.css';
// import ProjectCard from './ProjectCard';
// import { checkUser } from './UserFunctions'

class ProjectsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasErrors: false,
      projects: [],
      userName : ''
    }
    
  }
       componentDidMount() {
        const TheId = localStorage.getItem('currentUserId');
        ;(async () => {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard/${TheId}`)
          this.setState({ projects: response.data })
          // console.log(this.state.projects[0]['title'])
        })()
        
        const Name = localStorage.getItem('currentUserName');
        this.setState({ userName : Name});
  }
  
  renderingElements(){
    if(this.state.projects.length === 0){
      return (<div>
                 <h2>
                 What are you waiting for creating a project?
                </h2>
               <a href="/" className="btn btn-dark">Add a project</a>
            </div>)
    }
    else{
    const newArr = (this.state.projects).map((proj, item) => {
      return (
        <div className= "container_profile" key={proj._id}>
        <div className="card" style={{width:200}}>
           <div className="embed-responsive embed-responsive-4by3">
            <iframe width="100%" height="100%" src={proj.videoURL} frameBorder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen  title="1"></iframe>
            </div>
              <div className="card-body">
                <h4 className="card-title">{proj.title}</h4>
                <p className="card-text">{proj.description}</p>
                  <a href="/project" className="btn btn-dark">See full project</a><br/><br/>
                  <a href="/profile" className="btn btn-secondary">Update project</a><br/><br/>
                  <a href="/profile" className="btn btn-danger">Delete project</a>
                   </div>
               </div>
         </div>
        
              )
    })
        return newArr
    }
}
  
  render() {
    
      return (
        <div className="container_profile">
            <div><h2>Hello, {this.state.userName}!</h2></div>
             <div>
                 {this.renderingElements()}
             </div>
        </div>
    )
   
  }
}

export default ProjectsList
//TODO LIST 
/*

1. Get video url from projects and pass them to Project component prop

*/


// import React from 'react';
// import Project from './Project'
// import axios from "axios";
// // Import Personal Card Styling AND CONTAINER STYLING
// import '../ProjectStyles.css'

// class ProjectsList extends React.Component {

//     constructor() {
//         super();

//         this.state = {

//             // Will Contain array of projects that belong to the loggged in user
//             projectsOfUser: []

//         }

//     }

//     componentDidMount = () => {

//         if(!this.props.theUser) {
//             this.props.history.push('/login')
//         }
//         console.log("this is the did mount and the props ========= ", this.props)
//         // Calls endpoint in backend that returns projects from a logged in user 
//         axios.get(`${process.env.REACT_APP_API_URL}/dashboard/${this.props.theUser._id}`)// secure sending
//             .then(response => {
//                 console.log("...............", response);
//                 this.setState({ projectsOfUser: response.data });
//             })
//             .catch(function (error) {
//                 console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
//                 console.log(error);
//             })

//     };



//     render() {

//         // console.log("here: ", this.state.projectsOfUser)

//         // Get video information from projects so that we can we pass each projects info into 
//         //  it's own project component

//         // This is an array called projectInfo of objects with info that will be passed
//         const projectsInfo = this.state.projectsOfUser.map(project => {
        
//             return{

//                 videoTitle: project.title,
//                 videoURL:   project.videoURL,
//                 genre:      project.genre,
//                 description: project.description
            
//             }
        
//         });

//         console.log("AAAAAAAAAAAAAAAAaaaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAAAAAA",projectsInfo);

//         const listItems = this.state.projectsOfUser.map((project, i) =>
//             <li key={i}>

//                 {/* <Project videoURL={vidURLS[i]}/> */}
//                 <Project projectObject={projectsInfo[i]}/>

//             </li>
//         );


//         return (

//             <div className="project-container" >

//                 <ul>
//                     {this.state.projectsOfUser && listItems}
//                 </ul>

//             </div>

//         );
//     }
// }


// export default ProjectsList;