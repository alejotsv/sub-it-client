import React, { Component } from 'react';
import axios from 'axios';
// import '../ProjectStyles.css';
import { Link } from 'react-router-dom'
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

  
  delete = e => {
    const idpro = localStorage.getItem('projId')
    axios.delete(`${process.env.REACT_APP_API_URL}/project/${idpro}/deleteProject`)
        .then(console.log('Deleted'))
        .catch(err => console.log(err))
        
      }
       
  
  
  
  renderingElements(){
    // const uId = localStorage.getItem('currentUserId');
    if(this.state.projects.length === 0){
      return (<div>
                 <h2>
                 What are you waiting for creating a project?
                </h2>
               <a href={`/form`} className="btn btn-dark">Add a project</a>
            </div>)
    }
    else{
    const newArr = (this.state.projects).map((proj, item) => {
      localStorage.setItem('projId', proj._id);
      localStorage.setItem('title', proj.title);
      localStorage.setItem('genre', proj.genre);
      localStorage.setItem('description', proj.description);
      localStorage.setItem('language', proj.language);
      // const theProj = localStorage.getItem('projId')
      return (
        <div className= "container_profile" key={proj._id}>
        <div className="card" style={{width:450}}>
           <div className="embed-responsive embed-responsive-4by3">
            <iframe width="100%" height="100%" src={proj.videoURL} frameBorder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen  title="1"></iframe>
            </div>
              <div className="card-body">
                <h4 className="card-title">{proj.title}</h4>
                <h6 className="card-text">basic category: {proj.genre}</h6>
                <h6 className="card-text">brief reference: {proj.description}</h6>
                <h6 className="card-text">target language: {proj.language}</h6>
                  {/* TODO: Get project ID as variable to replace 'workingproject' */}
                  
              <Link to={`/project/${proj._id}`} className="btn btn-dark">Full project</Link>
              <Link to={`/update`} className="btn btn-secondary">Update project</Link>
              <button onClick={this.delete} className="remove-btn btn btn-danger">Delete</button>
               </div>
              </div>
              <div><Link to={"/form"} className="btn btn-dark">Add a project</Link></div>
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