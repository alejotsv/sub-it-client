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
       console.log(this.state.subtitles[0].text);
    })
     .catch((err)=> {})
    }
  
  listSubtitles = () => {
    console.log('This is my list:' + this.state.subtitles[0]);
  }

  render() {
    return(
      <div id='show-subtitles'>
        <ul>

        </ul>
      </div>
    );
  }

}

export default ShowSubtitles;