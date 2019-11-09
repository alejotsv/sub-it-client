import React from 'react';
import axios from "axios";

// TODO Make this Work


class ProjectForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            videoTitle: "",
            videoURL: "",
            // description: "",
            message: null
        }
    }

    genericSync(event) {
        // console.log("what is: ", event.target.value)
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        // console.log("submitting form");
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/create-project/${this.props.theUser._id}`)// secure sending
            .then(response => {
                console.log("...............", response);
                this.setState({ projectsOfUser: response.data });
            })
            .catch(function (error) {
                console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
                console.log(error);
            })
    }


    render() {
        return (

            <section>
                <h2> Video Info </h2>

                <form onSubmit={event => this.handleSubmit(event)} >
                    <label> Video Title: </label>
                    <input
                        value={this.state.videoTitle} // this.state.fullName
                        onChange={event => this.genericSync(event)}
                        type="text"
                        name="videoTitle"
                        placeholder="The Great Journey"
                    />

                    <label> Video File: </label>
                    <input
                        value={this.state.videoURL} // ex/ this.state.email
                        onChange={event => this.genericSync(event)}
                        type="file"
                        name="videoURL"
                    />

                    {/* <label> Password</label>
                    <input
                        value={password} // this.state.password
                        onChange={event => this.genericSync(event)}
                        type="password"
                        name="password"
                        placeholder="***********"
                    /> */}

                    <button> Upload </button>
                </form>
                {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
                {this.state.message && <div> {this.state.message} </div>}
            </section>

        );
    }
}

export default ProjectForm;