import React from 'react';


function Footer() {
    return (
      <div id="footer">
          
        <div className="card-deck">
  <div className="card bg-dark">
    <div className="card-body text-center">
      <p className="card-text">Upload your footage</p>
      <h6>Upload the video you want to subtitle or
      paste a link if it is already online</h6>
      
    </div>
  </div>
  <div className="card bg-dark">
    <div className="card-body text-center">
      <p className="card-text">Type and time your subtitles</p>
      <h6>Transcribe the text you want and space your subtitle 
          on the video timeline using IronTitles editor</h6>          
      
    </div>
  </div>
  <div className="card bg-dark">
    <div className="card-body text-center">
      <p className="card-text">Share your video</p>
      <h6>Download your subtitled video to share on social media</h6>
      <img className="socialMedia" src="https://i.ya-webdesign.com/images/social-media-bar-png.png" 
      
      alt="social media pics"/>
    </div>
  </div>
  </div>
      </div>
      
    );
  }

  export default Footer;