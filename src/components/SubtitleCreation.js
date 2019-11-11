import React from 'react';
// import Project from './Project'
// import axios from "axios";

class SubtitleCreation extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      subInit: false,      
      inTime: 0,
      outTime: 0,
      text: '',  
      inTimeVTT: '',
      outTimeVTT: ''
    }
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
        video.pause();
        tracks[0].cues[cuesLength - 1].endTime = outTime;
        this.setState({subInit: false });
        // call function to display modal and enter text subtitle
        this.completeSub();
      }
    };

    // function to display subtitle text modal after endTime has been set
    completeSub = () => {
      let modal = document.getElementById('sub-text');
      modal.style.display = 'block';      
    };

    // function to save subtitle with Save button in modal
    saveSubtitle = () => {
      let modal = document.getElementById('sub-text');
      let tracks = document.querySelector('video').textTracks;
      let video = document.getElementById('video');
      let cuesLength = tracks[0].cues.length;
      // set cue text to the text typed in the modal
      let theText = document.getElementById('this-sub-text').value;
      tracks[0].cues[cuesLength - 1].text = theText;
      // clear modal text
      document.getElementById('this-sub-text').value = '';
      this.setState({inTime: tracks[0].cues[cuesLength - 1].startTime, outTime: tracks[0].cues[cuesLength - 1].endTime, text: tracks[0].cues[cuesLength - 1].text });      
      video.play();
      modal.style.display = 'none';
    };

    // function to cancel and clear current subtitle sith Cancel button in modal
    cancelSubtitle = () => {
      let modal = document.getElementById('sub-text');
      let tracks = document.querySelector('video').textTracks;
      let video = document.getElementById('video');
      let cuesLength = tracks[0].cues.length;
      // delete current cue
      tracks[0].removeCue(tracks[0].cues[cuesLength - 1]);
      // clear modal text
      document.getElementById('this-sub-text').value = '';
      video.play();
      modal.style.display = 'none';
    };

  render() {

    return(
    <div>
      <button onClick={this.createSub}>Create sub</button>
      {/* Subtitle Modal */}
      <div id="sub-text" className="modal" style={{display:'none'}}>

        {/* Modal content */}
        <div id="sub-modal">
            <span id="close" onClick={this.cancelSubtitle}>&times;</span>
            <textarea id="this-sub-text" rows="2" cols="50" maxLength="80"></textarea>
            <button id="save-text-btn" onClick={this.saveSubtitle}>Save</button>
            <button id="cancel-btn" onClick={this.cancelSubtitle}>Cancel</button>
        </div>

      </div>
    </div>

    );
  }
}

export default SubtitleCreation;