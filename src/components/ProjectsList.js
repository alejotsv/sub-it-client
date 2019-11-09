//TODO LIST 
/*

1. Get video url from projects and pass them to Project component prop

*/


import React from 'react';
import Project from './Project'
import axios from "axios";
// Import Personal Card Styling AND CONTAINER STYLING
import '../ProjectStyles.css'

class ProjectsList extends React.Component {

    constructor() {
        super();

        this.state = {

            // Will Contain array of projects that belong to the loggged in user
            projectsOfUser: []

        }

    }

    componentDidMount = () => {

        if(!this.props.theUser) {
            this.props.history.push('/login')
        }
        console.log("this is the did mount and the props ========= ", this.props)
        // Calls endpoint in backend that returns projects from a logged in user 
        axios.get(`${process.env.REACT_APP_API_URL}/dashboard/${this.props.theUser._id}`)// secure sending
            .then(response => {
                console.log("...............", response);
                this.setState({ projectsOfUser: response.data });
            })
            .catch(function (error) {
                console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
                console.log(error);
            })

    };



    render() {

        // console.log("here: ", this.state.projectsOfUser)

        // Get video information from projects so that we can we pass each projects info into 
        //  it's own project component

        // This is an array called projectInfo of objects with info that will be passed
        const projectsInfo = this.state.projectsOfUser.map(project => {
        
            return{

                videoTitle: project.title,
                videoURL:   project.videoURL,
                genre:      project.genre,
                description: project.description
            
            }
        
        });

        console.log("AAAAAAAAAAAAAAAAaaaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAAAAAA",projectsInfo);

        const listItems = this.state.projectsOfUser.map((project, i) =>
            <li key={i}>

                {/* <Project videoURL={vidURLS[i]}/> */}
                <Project projectObject={projectsInfo[i]}/>

            </li>
        );


        return (

            <div className="project-container" >

                <ul>
                    {this.state.projectsOfUser && listItems}
                </ul>

            </div>

        );
    }
}


export default ProjectsList;