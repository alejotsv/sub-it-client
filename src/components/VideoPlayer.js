import React from 'react';

class VideoPlayer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {

    return(
    <div>
    <div id='video-container'>
      <video id="video" crossOrigin="anonymous" autoPlay controls preload="metadata">
      <source src={this.props.videoURL} />
        <track id="my-subs" label="English" kind="subtitles" srcLang="en" src="" default/> 
        </video>
    </div>      
    </div>

    );
  }
}

export default VideoPlayer;

