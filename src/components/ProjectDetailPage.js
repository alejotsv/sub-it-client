import React from 'react';
// import ReactPlayer from 'react-player';
import SubtitleCreation from './SubtitleCreation';
import ShowSubtitles from './ShowSubtitles';

class ProjectPage extends React.Component {
    state = {
        url: null,
        pip: false,
        playing: true,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false
    }


    playVideo = () => {
        // You can use the play method as normal on your video ref
        this.refs.vidRef.play();

    };

    pauseVideo = () => {
        // Pause as well
        this.refs.vidRef.pause();
        this.refs.vidRef.currentTime = 0;
    };

    render() {

        return (

            <div className= "container_profile">

                <div id='video-container'>

                    {/* <video
                        id="project-Being-Worked-On"
                        ref="vidRef"
                        src="https://assets.polestar.com/video/test/polestar-1_09.mp4"
                        type="video/mp4"
                        onMouseOver={this.playVideo}
                        onMouseLeave={this.pauseVideo}
                    /> */}

                    <video id="video" crossOrigin="anonymous" autoPlay controls preload="metadata">
                    
                    {/* TODO: Get project video URL from axios */}
                    <source src="https://res.cloudinary.com/alejotsv/video/upload/v1572146282/videoplayback_dznrfa.mp4" type="video/mp4" />
                    <track id="my-subs" label="English" kind="subtitles" srcLang="en" src="" default/> 
                    </video>

                    <div>
                        

                        {/* Button to work with subtitles (Add proper functions above ) */}
                        {/* <button onClick={this.playVideo}>
                            Play!
                        </button>

                        <button onClick={this.pauseVideo}>
                            Pause!
                    </button> */}

                    </div>
                    
                </div>
                
                {/* TODO: Get projectID from URL */}
                < SubtitleCreation projectId='5dc8e4dedc3f1e1899a79483'/>
                {/* < ShowSubtitles projectId='5dc8e4dedc3f1e1899a79483' /> */}
                
            </div>




        );
    }
}

export default ProjectPage;