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

      refreshPage = e => {
          window.location.reload(false);
        }

        componentWillUnmount(){
           
        }
       
  
  renderingElements(){
    // const uId = localStorage.getItem('currentUserId');
    if(this.state.projects.length === 0){
      return (<div className="container_profile" style={{marginTop: "5%"}}>
                 <h4 className="main_text">
                   {this.state.userName}, add a project!
                 </h4>
              <a href={`/form`}>
                <img src="/plusCircular.png" id="plusSign"/>
               </a>
              
              </div>)
    }
    else{
    const newArr = (this.state.projects).map((proj, item) => {
      localStorage.setItem('projId', proj._id);
      localStorage.setItem('title', proj.title);
      localStorage.setItem('genre', proj.genre);
      localStorage.setItem('description', proj.description);
      localStorage.setItem('language', proj.language);
      return (
      
     <div className="container_profile" key={proj._id} >
        <div className="card" style={{width:200, marginBottom: "50%"}}>
           <Link to={`/project/${proj._id}`} className="btn btn-dark" style={{backgroundColor: "black"}}>See full project</Link>
           <div className="embed-responsive embed-responsive-4by3">
            <iframe width="100%" height="100%" src={proj.videoURL} frameBorder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen  title="1"></iframe>
            </div>
              <div className="card-body">
                <h4 className="card-title">{proj.title}</h4>
                <h6 className="card-title">genre: {proj.genre}</h6>
                <h6 className="card-title">description: {proj.description}</h6>
                <h6 className="card-title">language: {proj.language}</h6>
                            
              <Link to={`/update`}>
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
                 {/* <h2>New project <a href={`/form`}>
                     <img src="/plusCircular.png" id="plusSign"/>
                  </a></h2>  */}
                  
                <div className="flex-container">
                  
                  {this.renderingElements()}
                </div>
              </div>
              
         )
   
  }
}

export default ProjectsList