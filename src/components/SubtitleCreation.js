import React from 'react';
import axios from "axios";
import FileSaver from 'file-saver';

class SubtitleCreation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      subInit: false,
      inTime: 0,
      outTime: 0,
      text: '',
      inTimeVTT: '',
      outTimeVTT: '',
      subtitles: [],
      download: []
    }
  }

  componentDidMount() {
    let thisProjectId = this.props.projectId;
    axios.get(`${process.env.REACT_APP_API_URL}/subtitles/${thisProjectId}`)
      .then((response) => {
        this.setState({ subtitles: response.data.subArray });
        this.listSubtitles();
      })
      .catch((err) => { })
  }

  listSubtitles = () => {
    let tracks = document.querySelector('video').textTracks;
    let subtitleList = document.getElementById('sub-tbody');
    let projectSubtitles = this.state.subtitles;

    // Loop through array
    projectSubtitles.map((sub) => {
      // Add existing subtitles to HTML track tag
      let inTime = sub.inTime;
      let outTime = sub.outTime;
      let text = sub.text;
      let cue = new VTTCue(inTime, outTime, text);
      tracks[0].addCue(cue);
      console.log(tracks[0]);

      // Display existing subtitles in DOM
      subtitleList.innerHTML +=
        `<tr class="each-sub">
      <td>${sub.text}</td>
      <td>${sub.inTimeVTT}</td>
      <td>${sub.outTimeVTT}</td>
    </tr>
    `;
    })
  }

  listOneSubtitle = (sub, inTimeVTT, outTimeVTT) => {
    // Display subtitle in DOM
    let subtitleList = document.getElementById('sub-tbody');
    // subtitleList.innerHTML += `<li>${sub} || ${inTimeVTT} --> ${outTimeVTT}</li><br>`;
    subtitleList.innerHTML +=
      `<tr class="each-sub">
      <td>${sub}</td>
      <td>${inTimeVTT}</td>
      <td>${outTimeVTT}</td>
      </tr>
    `;


  }

  timeToVTT = (num) => {
    let stringNum = num.toFixed(3);
    let splitNum = stringNum.split('.');
    let totalSeconds = splitNum[0];
    let totalMilliseconds = splitNum[1];

    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    // If you want strings with leading zeroes:
    minutes = String(minutes).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    let timeVTT = hours + ":" + minutes + ":" + seconds + "." + totalMilliseconds;

    return timeVTT;
  };

  // function to create each subtitle
  createSub = () => {
    let tracks = document.querySelector('video').textTracks;
    let video = document.getElementById('video');
    let button = document.getElementById('creation-button');

    // if inTime has not been defined, create a new cue with startTime set to current video time
    if (this.state.subInit === false) {
      let inTime = video.currentTime;
      let cue = new VTTCue(inTime, null, '');
      tracks[0].addCue(cue);
      this.setState({ subInit: true });
      button.innerHTML = 'Out Time';
      // if inTime has already been defined, set cue endTime to current video time and pause video
    } else {
      let outTime = video.currentTime;
      let cuesLength = tracks[0].cues.length;
      video.pause();
      tracks[0].cues[cuesLength - 1].endTime = outTime;
      this.setState({ subInit: false });
      // call function to display modal and enter text subtitle
      this.completeSub();
      button.innerHTML = 'In Time';
    }
  };

  // function to display subtitle text modal after endTime has been set
  completeSub = () => {
    let modal = document.getElementById('myModal');
    modal.style.display = 'block';
  };

  // function to save subtitle with Save button in modal
  saveSubtitle = () => {
    let modal = document.getElementById('myModal');
    let tracks = document.querySelector('video').textTracks;
    let video = document.getElementById('video');
    let cuesLength = tracks[0].cues.length;
    
    // set cue text to the text typed in the modal
    let theText = document.getElementById('this-sub-text').value;
    tracks[0].cues[cuesLength - 1].text = theText;
    // clear modal text
    document.getElementById('this-sub-text').value = '';
    let thisProjectId = this.props.projectId;

    // Create VTT inTime and outTime with timeToVTT function
    let inVTT = this.timeToVTT(tracks[0].cues[cuesLength - 1].startTime);
    let outVTT = this.timeToVTT(tracks[0].cues[cuesLength - 1].endTime);

    // Set state with current subtitle
    this.setState({ inTime: tracks[0].cues[cuesLength - 1].startTime, outTime: tracks[0].cues[cuesLength - 1].endTime, text: tracks[0].cues[cuesLength - 1].text, inTimeVTT: inVTT, outTimeVTT: outVTT },
      () => {
        // After setting state, define headers for axios post request
        let thisSubtitle = {
          inTime: this.state.inTime,
          outTime: this.state.outTime,
          text: this.state.text,
          inTimeVTT: this.state.inTimeVTT,
          outTimeVTT: this.state.outTimeVTT
        }

        // Display sub in list
        this.listOneSubtitle(this.state.text, this.state.inTimeVTT, this.state.outTimeVTT);

        // Post request to push current subtitle to the database
        axios.post(`${process.env.REACT_APP_API_URL}/${thisProjectId}/add-sub`, thisSubtitle)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });


      }
    );
    video.play();
    modal.style.display = 'none';
  };


  // function to cancel and clear current subtitle sith Cancel button in modal
  cancelSubtitle = () => {
    // let modal = document.getElementById('sub-text');
    let modal = document.getElementById('myModal')
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

  downloadSub = () => {
    let thisProjectId = this.props.projectId;
    let downloadVTT = `WEBVTT`
    axios.get(`${process.env.REACT_APP_API_URL}/subtitles/${thisProjectId}`)
      .then((response) => {
        this.setState({ download: response.data.subArray });
        let finishedSubs = this.state.download;
        finishedSubs.map((sub) => {
          downloadVTT += `\n\n${sub.inTimeVTT} --> ${sub.outTimeVTT}\n${sub.text}`;
        });
        let blob = new Blob([downloadVTT], { type: "text/plain;charset=utf-8", endings: 'native' });
        FileSaver.saveAs(blob, 'subtitles.vtt');
      })
      .catch((err) => { });

  }

  render() {

    return (
      <div>
        <div>
          <button id='creation-button' className="btn btn-secondary" onClick={this.createSub}>In Time</button>
        </div>
        <div className="creationSub">

          {/* Subtitle Modal */}
          {/* <div id="sub-text" className="modal" style={{display:'none'}}> */}
          {/* Modal content */}
          {/* <div id="sub-modal">
            <span id="close" onClick={this.cancelSubtitle}>&times;</span>
            <textarea id="this-sub-text" rows="2" cols="50" maxLength="80"></textarea>
            <button id="save-text-btn" onClick={this.saveSubtitle}>Save</button>
            <button id="cancel-btn" onClick={this.cancelSubtitle}>Cancel</button>
            </div>
          </div>  */}

          <div className="modal" id="myModal">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">The text must be shorter than 80 characters</h4>
                  <button type="button" className="close" onClick={this.cancelSubtitle} data-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <textarea id="this-sub-text" rows="2" cols="50" maxLength="80"></textarea>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-dismiss="modal" id="cancel-btn"
                    onClick={this.cancelSubtitle}>Close</button>

                  <button type="button" className="btn btn-primary" data-dismiss="modal" id="save-text-btn"
                    onClick={this.saveSubtitle}>Save</button>

                </div>
              </div>
            </div>
          </div>
          {/* Subtitle list div */}
          <div>
            <div id='show-subtitles'>
              <table id="subtitle-list">
                <thead>
                  <tr>
                    <th>Text</th>
                    <th>In time</th>
                    <th>Out time</th>
                  </tr>
                </thead>
                <tbody id="sub-tbody">

                </tbody>
              </table>

            </div>
            <button id='download-button' onClick={this.downloadSub} className="btn btn-secondary">Download subtitles</button>


          </div>
          <div>

          </div>
        </div>
      </div>
    );
  }
}

export default SubtitleCreation;