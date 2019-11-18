import React from 'react';
// import ReactPlayer from 'react-player';
import SubtitleCreation from './SubtitleCreation';
import VideoPlayer from './VideoPlayer';
// import ShowSubtitles from './ShowSubtitles';
import axios from 'axios';

class ProjectPage extends React.Component {
    
    state = {
        videoURL: '',        
        ready: false,
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
        loop: false,
        currentProjectId: '',        
    }
    
    getIdFromUrl = () => {
        let path = window.location.pathname;
        let parts = path.split('/');
        let projectId = parts.pop() || parts.pop(); 
        return projectId;       
    }
    
    UNSAFE_componentWillMount(){
        let currentProjectId = this.getIdFromUrl();
        console.log('my project ID is: '+ currentProjectId);
        this.setState({currentProjectId: currentProjectId});
        axios.get(`${process.env.REACT_APP_API_URL}/project-info/${currentProjectId}`)
            .then( (response) => {                
                this.setState({ videoURL: response.data.videoURL });
            })
            .catch((err)=> {})
         
        }

    componentDidMount(){
        this.state.ready = true;
    }


        // https://res.cloudinary.com/alejotsv/video/upload/v1572146282/videoplayback_dznrfa.mp4
    
    // playVideo = () => {
    //     // You can use the play method as normal on your video ref
    //     this.refs.vidRef.play();
        
    // };
    
    // pauseVideo = () => {
    //     // Pause as well
    //     this.refs.vidRef.pause();
    //     this.refs.vidRef.currentTime = 0;
    // };
    
    render() {
        
        // 
        let videoURL = this.state.videoURL;        
        let video;
        
        if (this.state.ready){
            video = < VideoPlayer videoURL={videoURL} />;
        } else {
            video = 'Loading...';
        }      
        

        return (

            <div className="container_video">

               <div>{video}</div>  
                {/* <div id='video-container'>
                    <video id="video" crossOrigin="anonymous" autoPlay controls preload="metadata">
                    <source src={this.state.videoURL} />
                    <track id="my-subs" label="English" kind="subtitles" srcLang="en" src="" default/> 
                    </video>
                </div> */}
                
                {/* TODO: Get projectID from URL */}
               <div>< SubtitleCreation projectId={this.state.currentProjectId}/></div> 
                
            </div>




        );
    }
}

export default ProjectPage;