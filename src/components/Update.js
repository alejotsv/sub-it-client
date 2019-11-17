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
    const theTitle = localStorage.getItem('title')
    const theGenre = localStorage.getItem('genre')
    const theDescription = localStorage.getItem('description')
    const theLanguage = localStorage.getItem('language')
              this.setState({ 
                project_title: theTitle, 
                project_genre: theGenre, 
                project_description: theDescription, 
                project_Language: theLanguage, 
            })
            this.onChangeTitle = this.onChangeTitle.bind(this);
            this.onChangeGenre = this.onChangeGenre.bind(this);
            this.onChangeDescription = this.onChangeDescription.bind(this);
            this.onChangeLanguage = this.onChangeLanguage.bind(this);
            this.onSubmit = this.onSubmit.bind(this); 
 }

 onChangeTitle(e) {
  this.setState({
    project_title: e.target.value
  });
}
onChangeGenre(e) {
  this.setState({
    project_genre: e.target.value
  })  
}
onChangeDescription(e) {
  this.setState({
    project_description: e.target.value
  })
}
onChangeLanguage(e) {
  this.setState({
    project_language: e.target.value
  })
}
  
  onSubmit(e) {
    e.preventDefault();

    const obj = {
      title: this.state.project_title,
      genre: this.state.project_genre,
      description: this.state.project_description,
      language: this.state.project_language,
    };

    const idPro = localStorage.getItem('projId')
    axios.put(`${process.env.REACT_APP_API_URL}/project/${idPro}/updateProject`, obj)
        .then(res => console.log(res.data));

    const Id = localStorage.getItem('currentUserId');
      this.props.history.push(`/dashboard/${Id}`);
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
                      value={this.state.project_title}
                      // onChange={ e => this.handleChange(e)}
                      onChange={this.onChangeTitle}
                      />
                </div>
                <div className="form-group">
                    <label>Genre: </label>
                    <input type="text" 
                       name="genre"
                      className="form-control"
                      value={this.state.project_genre}
                      // onChange={ e => this.handleChange(e)}
                      onChange={this.onChangeGenre}
                      />
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <textarea type="text" 
                      name="description"
                      className="form-control"
                      value={this.state.project_description}
                      // onChange={ e => this.handleChange(e)}
                      onChange={this.onChangeDescription}
                      />
                </div>
                <div className="form-group">
                    <label>Language: </label>
                    <input type="text" 
                      name="language"
                      className="form-control"
                      value={this.state.project_language}
                      onChange={this.onChangeLanguage}
                      // onChange={ e => this.handleChange(e)}
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