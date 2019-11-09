//TODO LIST 
/*
1. Fill up card with video


*/

/*

projectObject is a prop that is recieving an object with information of a video

*/

import React from 'react';

// Import Personal Card Styling
import '../ProjectStyles.css'

class Project extends React.Component {


    playVideo = () => {

        // References video with "vidRef" ref attribute, then plays the video
        this.refs.vidRef.play();

    };

    pauseVideo = () => {
        // References video with "vidRef" ref attribute, then pauses the video
        this.refs.vidRef.pause();
        this.refs.vidRef.currentTime = 0;
    };


    render() {

        return (
            <div>

                <div className="card ">

                    <div className="card_video">

                        <video
                            ref="vidRef"
                            src={this.props.projectObject.videoURL} 
                            type="video/mp4"
                            onMouseOver={this.playVideo}
                            onMouseLeave={this.pauseVideo}
                        >
                        </video>

                    </div>

                    <div className="card_title title-white">

                        {/* <p>Video Title</p> */}
                        <p>{this.props.projectObject.videoTitle}</p>

                    </div>

                </div>

            </div>
        );
    }


};

export default Project;
