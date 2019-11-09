import React from 'react';
// import ReactPlayer from 'react-player';
import SubtitleCreation from './SubtitleCreation';

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

            <div>

                <div>

                    {/* <video
                        id="project-Being-Worked-On"
                        ref="vidRef"
                        src="https://assets.polestar.com/video/test/polestar-1_09.mp4"
                        type="video/mp4"
                        onMouseOver={this.playVideo}
                        onMouseLeave={this.pauseVideo}
                    /> */}

                    <video id="video" crossOrigin="anonymous" autoPlay controls preload="metadata">
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

                < SubtitleCreation />

            </div>




        );
    }
}

export default ProjectPage;