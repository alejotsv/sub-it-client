import React from 'react';
import Project from './Project'
import axios from "axios";

// Import Personal Card Styling AND CONTAINER STYLING
import '../../ProjectStyles.css'

class ProjectsList extends React.Component {

    constructor() {
        super();

        this.state = {

            // Will Contain array of projects that belong to the loggged in user
            projectsOfUser: []

        }

    }

    componentDidMount = () => {

        // If not signed in, send them to login page
        if (!this.props.theUser) {
            this.props.history.push('/login')
        }

        console.log("333333333333333333333333 this is the did mount and the props ========= ", this.props)
        // Calls endpoint in backend that returns projects from a logged in user 
        axios.get(`http://localhost:3001/api/dashboard/${this.props.theUser._id}`)// secure sending
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

        // Get video information from projects so that we can we pass each projects info into 

        // Array @projectInfo : Will have objects with info from each project user currently has (title,url,genre,description)
        const projectsInfo = this.state.projectsOfUser.map(project => {

            return {

                videoTitle: project.title,
                videoURL: project.videoURL,
                genre: project.genre,
                description: project.description

            }

        });

        // console.log("PROJECTS THAT WILL BE LISTED -------------------- ", projectsInfo);
        const listItems = this.state.projectsOfUser.map((project, i) =>
            <li key={i}>

                {/* Not changing mutating in state array */}
                {/* Passes info to each component, info is from our array of of objects with video info */}
                <Project projectObject={projectsInfo[i]} />

            </li>
        );

        return (

            <div className="project-container" >

                <ul>
                    {/* If user has projects, render the list of projects */}
                    {this.state.projectsOfUser && listItems}
                </ul>

            </div>

        );
    }
}


export default ProjectsList;