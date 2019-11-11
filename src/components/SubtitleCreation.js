import React from 'react';
// import Project from './Project'
// import axios from "axios";

class SubtitleCreation extends React.Component {
  state = {
    subInit: false
  }
    // function to create each subtitle
    createSub = () => {
      let tracks = document.querySelector('video').textTracks;
      let video = document.getElementById('video');

      // if inTime has not been defined, create a new cue with startTime set to current video time
      if (this.state.subInit === false){      
        let inTime = video.currentTime;
        let cue = new VTTCue(inTime,null,'');      
        tracks[0].addCue(cue);    
        this.setState({subInit: true });
      // if inTime has already been defined, set cue endTime to current video time and pause video
      } else {
        let outTime = video.currentTime;
        let cuesLength = tracks[0].cues.length;
        console.log('cuesLength = ' + cuesLength)
        video.pause();
        tracks[0].cues[cuesLength - 1].endTime = outTime;
        console.log(tracks[0]);
        console.log(tracks[0].cues[cuesLength - 1]);
        this.setState({subInit: false });
        // call function to display modal and enter text subtitle
        this.completeSub();
      }
    }

    // function to display subtitle text modal after endTime has been set
    completeSub = () => {
      let modal = document.getElementById('sub-text');
      modal.style.display = 'block';      
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