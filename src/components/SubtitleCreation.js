import React from 'react';
import Project from './Project'
import axios from "axios";

class SubtitleCreation extends React.Component {
  state = {
    subInit: false
  }

    createSub = () => {
    let tracks = document.querySelector('video').textTracks;
    let video = document.getElementById('video');

    if (this.state.subInit === false){      
      let inTime = video.currentTime;
      let cue = new VTTCue(inTime,null,'');      
      tracks[0].addCue(cue);    
      this.setState({subInit: true });
    } else {
      let outTime = video.currentTime;
      let cuesLength = tracks[0].cues.length;
      console.log('cuesLength = ' + cuesLength)
      video.pause();
      tracks[0].cues[cuesLength - 1].endTime = outTime;
      console.log(tracks[0]);
      console.log(tracks[0].cues[cuesLength - 1]);
      this.setState({subInit: false });
    }
  } 

  render() {

    return(
    <div>
      <button onClick={this.createSub}>Create sub</button>
      {/* Subtitle Modal */}
      <div id="sub-text" className="modal" style={{display:'none'}}>

        {/* Modal content */}
        <div id="sub-modal">
            <span id="close">&times;</span>
            <textarea id="this-sub-text" rows="2" cols="50" maxLength="80"></textarea>
            <button id="save-text-btn">Save</button>
            <button id="cancel-btn">Cancel</button>
        </div>

      </div>
    </div>

    );
  }
}

export default SubtitleCreation;