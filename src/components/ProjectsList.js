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
      userName: ''
    }

  }
  componentDidMount() {
    const TheId = localStorage.getItem('currentUserId');
    console.log("no dot env ===== ", process.env.REACT_APP_API_URL);
    ; (async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard/${TheId}`)
      console.log("the project info +++++++++++++++++ ", response);
      this.setState({ projects: response.data })
      // console.log(this.state.projects[0]['title'])
    })()

    const Name = localStorage.getItem('currentUserName');
    this.setState({ userName: Name });
  }

  renderingElements() {
    const uId = localStorage.getItem('currentUserId');
    if (this.state.projects.length === 0) {
      return (<div>
        <h2>
          What are you waiting for creating a project?
                </h2>
        <a href={`/projectForm/${uId}`} className="btn btn-dark">Add a project</a>
      </div>)
    }
    else {
      
      console.log("-------------- ", this.state.projects);
      
      const newArr = (this.state.projects).map((proj, item) => {
        return (
          <div className="container_profile" key={proj._id}>
            <div className="card" style={{ width: 200 }}>
              <div className="embed-responsive embed-responsive-4by3">
                <iframe width="100%" height="100%" src={proj.videoURL} frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen title="1"></iframe>
              </div>
              <div className="card-body">
                <h4 className="card-title">{proj.title}</h4>
                <p className="card-text">{proj.description}</p>
                <a href="/project" className="btn btn-dark">See full project</a><br /><br />
                <a href="/profile" className="btn btn-secondary">Update project</a><br /><br />
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
