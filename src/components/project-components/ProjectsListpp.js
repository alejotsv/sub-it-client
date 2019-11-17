import React from 'react';
import Project from './Project'
import axios from "axios";
import { NavLink } from "react-router-dom";

// Import Personal Card Styling AND CONTAINER STYLING
import '../../ProjectStyles.css'

class ProjectsList extends React.Component {

    constructor() {
        super();

        // TODO MARCOS WHY DID I NEED THIS
        this.handleClick = this.handleClick.bind(this);

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

        console.log("MOUNTED PROJECTLIST COMPONENT");

        // Calls endpoint in backend that returns projects from a logged in user 
        axios.get(`${process.env.REACT_APP_API_URL}/dashboard/${this.props.theUser._id}`)// secure sending
            .then(response => {
                console.log("||||||||||| PROJECTS THAT WILL BE LISTED |||||||||||", response.data);
                this.setState({ projectsOfUser: response.data });
            })
            .catch(function (error) {
                console.log(" \\\\\\\\\\\\\\\\ Error Getting User Projects From Backend \\\\\\\\\\\\\\\\");
                console.log(error);
            })

    };

    handleClick(project) {

        let theProject =  project;
        console.log(`CLICKED PROJECT`,theProject)

        // Redirect To Detail Page with url of video
   
        this.props.history.push({
            pathname: `/projectwork`,
            state: {
                project: theProject
            }
        }
        );

    }

    renderingElements() {

        if (this.state.projectsOfUser.length === 0) {

            return (

                <div>

                    <h2>
                        What are you waiting for {this.props.theUser.userName} ?  Start creating!
                    </h2>

                    <NavLink className="navbar-brand" to="/projectForm/">
                        <span className="nav_elements"> Add a Project </span>
                    </NavLink>

                </div>
            )
        }
        else {

            // TODO ask if its better pratice to do these here or above render

            // Get video information from projects so that we can we pass each projects info into 

            // Array @projectInfo : Will have objects with info from each project user currently has (title,url,genre,description)
            const projectsInfo = this.state.projectsOfUser.map(project => {
                // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', project);
                return {

                    videoID: project._id,
                    videoTitle: project.title,
                    videoURL: project.videoURL,
                    genre: project.genre,
                    description: project.description

                }

            });

            // console.log("PROJECTS THAT WILL BE LISTED -------------------- ", projectsInfo);
            const listItems = this.state.projectsOfUser.map((project, i) =>

                <li key={i}
                    className="project-list-container__list__list-items"
                    onClick={() => this.handleClick(project)}
                >

                    {/* Not changing mutating in state array */}
                    {/* Passes info to each component, info is from our array of of objects with video info */}
                    <Project projectObject={projectsInfo[i]} />

                </li>
            );

            return listItems;

        }

    }


    render() {

        return (

            <div className="project-list-container">

                <ul className="project-list-container__list">

                    {/* If user has projects, render the list of projects */}
                    {/* {this.state.projectsOfUser && listItems} */}
                    {this.renderingElements()}

                </ul>



            </div>

        );
    }
}


export default ProjectsList;