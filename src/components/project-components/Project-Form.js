import React from 'react';
import axios from "axios";

import FileViewer from 'react-file-viewer';

import Dropzone from '../dropzone'

class ProjectForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            videoTitle: "",
            genre: "",
            description: '',
            language: "",
            videoFile: ``,
            tempFileURL: '',
            userGaveFile: true,
            message: null
        }

    }

    genericSync(event) {
        // console.log("what is: ", event.target.value)
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


    // TODO MAKE THIS FUNCTION UPDATE PARENT STATE FROM CHILLD (DROPZONE)

    updateStateFileIfFileAdded(value) {


        console.log(`Im in the function in prop, preparing to update state!`);
        this.setState({
            videoFile: value,
            tempFileURL: URL.createObjectURL(value),
            userGaveFile: true
        });

        console.log(`I am after state is set with file from dropzone!`);

    }

    handleSubmit(event) {
        if(!this.props.theUser) {
            this.props.history.push('/login');
        }

        // prevent behavior of form submission (refreshing or clcearing?) page
        event.preventDefault()

        console.log('ENTERING SUBMIT, FILE IN STATE IS ', this.state.videoFile);

        let data = new FormData();
        data.append('videoTitle', this.state.videoTitle);
        data.append('genre', this.state.genre);
        data.append('description', this.state.description);
        data.append('language', this.state.language);

        console.log('SELECTED FILE BEFORE APPPENDING', this.state.videoFile);
        data.append('videoFile', this.state.videoFile);

        axios.post(`http://localhost:3001/tut/uploadFile/${this.props.theUser._id}`, data, { withCredentials: true })
            .then((response) => {
                console.log('SUCCESSFUL CALL');
                alert(JSON.stringify(response));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {


        return (

            <section>

                <h2> Video Info </h2>

                <form name='myForm' onSubmit={event => this.handleSubmit(event)} >

                    <label> Video Title: </label>
                    <input
                        value={this.state.videoTitle} // this.state.fullName
                        onChange={event => this.genericSync(event)}
                        type="text"
                        name="videoTitle"
                        placeholder="The Great Journey"
                    />

                    <label> Video Genre: </label>
                    <input
                        value={this.state.genre} // this.state.fullName
                        onChange={event => this.genericSync(event)}
                        type="text"
                        name="genre"
                        placeholder="The Great Journey"
                    />

                    <label> Video Description: </label>
                    <input
                        value={this.state.description} // this.state.fullName
                        onChange={event => this.genericSync(event)}
                        type="text"
                        name="description"
                        placeholder="The Great Journey"
                    />

                    <label className="file-preview"> Video Language: </label>
                    <input
                        value={this.state.language} // this.state.fullName
                        onChange={event => this.genericSync(event)}
                        type="text"
                        name="language"
                        placeholder="The Great Journey"
                    />

                    <br /> <label> Video File: </label>

                    <Dropzone updateParent={this.updateStateFileIfFileAdded.bind(this)} />
                    
                    <button> Update </button>

                    {/* Styling is in app.css */}
                    <FileViewer
                        fileType={'mp4'}
                        filePath={this.state.tempFileURL}

                    />


                </form>

                {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
                {this.state.message && <div> {this.state.message} </div>}

            </section>

        );
    }
}

export default ProjectForm;