// edit.component.js

import React, { Component } from 'react';
import axios from 'axios';

export default class Update extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      project_title: '',
      project_genre: '',
      project_description: '',
      project_language: '',
    }
  }

  componentDidMount() {
    // const idPro = localStorage.getItem('projId')
    // const Id = localStorage.getItem('currentUserId');
    const proj = {
      project_title: this.state.project_title,
      project_genre: this.state.project_genre,
      project_description: this.state.project_description,
      project_language: this.state.project_language,
    };
    const idPro = localStorage.getItem('projId')
    axios.put(`/project/${idPro}/updateProject`, { proj })
    .then(res => {
      this.setState({proj})
    })
      
    }

    handleChange = e => {  
      this.setState({name : e.target.value })
          }
  
  onSubmit(e) {
    e.preventDefault();
    
      

    this.props.history.push('/dashboard');

    }
 
  render() {
    return (
        <div style={{ "marginTop": "10%" }}>
            <h3 align="center">Update Project</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Title:  </label>
                    <input 
                      type="text" 
                      name="title"
                      className="form-control" 
                      // value={this.state.project_title}
                      onChange={ e => this.handleChange(e)}
                      />
                </div>
                <div className="form-group">
                    <label>Genre: </label>
                    <input type="text" 
                       name="genre"
                      className="form-control"
                      // value={this.state.project_genre}
                      onChange={ e => this.handleChange(e)}
                      />
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <textarea type="text" 
                      name="description"
                      className="form-control"
                      // value={this.state.project_description}
                      onChange={ e => this.handleChange(e)}
                      />
                </div>
                <div className="form-group">
                    <label>Language: </label>
                    <input type="text" 
                      name="language"
                      className="form-control"
                      // value={this.state.project_language}
                      
                      onChange={ e => this.handleChange(e)}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Edit Project" 
                      className="btn btn-lg btn-dark btn-block"/>
                </div>
            </form>
        </div>
    )
  }
}