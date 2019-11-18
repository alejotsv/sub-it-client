import React from 'react';
import axios from 'axios';

class ShowSubtitles extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subtitles: []
    }    
  }

  componentDidMount(){
    let thisProjectId = this.props.projectId;
    axios.get(`${process.env.REACT_APP_API_URL}/subtitles/${thisProjectId}`)
     .then( (response) => {
       this.setState({ subtitles: response.data.subArray });       
       this.listSubtitles();
    })
     .catch((err)=> {})
    }
  
  listSubtitles = () => {
    let subtitleList = document.getElementById('subtitle-list');
    let projectSubtitles = this.state.subtitles;
    projectSubtitles.map((sub) => {
      subtitleList.innerHTML += `<li>${sub.text}</li><br>`;
    })
    console.log(subtitleList.innerHTML);
  }

  render() {
    return(
      <div id='show-subtitles'>
        Subtitles:
        <ul id='subtitle-list'>
        </ul>

  {/* <table class="table table-hover table-dark">
   <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  </table> */}

      </div>
    );
  }

}

export default ShowSubtitles;