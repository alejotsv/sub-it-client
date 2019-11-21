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
        (async () => {
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

      return (
        <div className="container_dashboard" style={{marginTop: "-2%"}}>
                <div style={{marginRight: "6%", marginTop: "9%"}}>
                <div className="card bg-secondary rounded-circle" >
                  <div className="card-body text-center">
                    <div className="card bg-secondary rounded-circle" >
                      <div className="card-body text-center">
                       <div className="card bg-secondary rounded-circle" >
                         <div className="card-body text-center">
                         <p className="card-text">Welcome {this.state.userName}!</p>
                         <Link to={`/form`} className="btn btn-dark">Add project</Link> 
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                   
                 </div>
                 </div>
                 </div>
                 )
    }
    else{
    const newArr = (this.state.projects).map((proj, item) => {
      localStorage.setItem('projId', proj._id);
      localStorage.setItem('title', proj.title);
      localStorage.setItem('genre', proj.genre);
      localStorage.setItem('description', proj.description);
      localStorage.setItem('language', proj.language);
      return (
      
     <div className="container_dashboard_1" style={{marginTop: "1%"}} key={proj._id} >
        <div className="card" style={{width:200, marginLeft: "4%", marginTop: "4%"}}>
           <Link to={`/project/${proj._id}`} className="btn btn-dark" style={{backgroundColor: "black"}}>See full project</Link>
           <div className="embed-responsive embed-responsive-4by3">
            <iframe width="100%" height="100%" src={proj.videoURL} frameBorder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen  title="1"></iframe>
            </div>
              <div className="card-body bg-dark">
                <h4 className="card-title form_title_text">{proj.title}</h4>
                <h5 className="card-title form_text">Genre: {proj.genre}</h5>
                <h5 className="card-title form_text">Description: {proj.description}</h5>
                <h5 className="card-title form_text">Language: {proj.language}</h5>
                            
              <Link to={`/update/${proj._id}`}>
                <img src="/edit.png" id="Edit"/>
              </Link>

              <Link to={`#`}onClick={this.delete}>
                <img src="/delete.png" id="Delete"/>
              </Link>
              
              {/* <button onClick={this.delete} className="remove-btn btn btn-danger">Delete</button> */}
              
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
                  {/* {/* <Link className="bg-secondary" to={`/form`}><label className="bg-dark button_text">New Project</label> </Link>                */}
                  <div className="flex-container"> 
                  
                  {this.renderingElements()}
                </div>
              </div>
              
         )
   
  }
}

export default ProjectsList