// import { login } from './UserFunctions' // I should read this

import React, { Component } from 'react'
import axios from "axios";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            message: null
        }
    }

    // Changes state values for change in text fields
    genericSync(event) {
        console.log("==============================================================Target is: ", event.target)
        console.log("==============================================================Value is: ", event.target.value)
        // Destructure to get naame and value for target 
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {

        console.log("submitting form");
        event.preventDefault();

        axios.post(

            // route we are hitting in the backend to login
            `${process.env.REACT_APP_API_URL}/login`,
            // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
            this.state,
            // secure sending
            { withCredentials: true }
        )
            .then(responseFromServer => {

                console.log("response from back end is:", responseFromServer.data);
                // console.log("do I have any props ????????? ", this.props)
                const { userDoc } = responseFromServer.data;

                console.log(`Here is the user logged in info: `, userDoc)


                this.props.onUserChange(userDoc);
                console.log(`~~~~~~~~~~~~~ USER DOC`, userDoc);
                // this.props.history.push('/ProjectsList');

                // alert("You are logged in.")

            })
            .catch(err => {
                console.log("err: ", err.response)
                if (err) return this.setState({ message: err })
            });
    }

    render() {

        return (
            <div className="container_login">

                <section>

                    <h2> Login </h2>
                    <form onSubmit={event => this.handleSubmit(event)} >

                        <label> Email: </label>
                        <input
                            // value={email} // this.state.email
                            onChange={event => this.genericSync(event)}
                            type="email"
                            name="email"
                            placeholder="my-email@ironhack.com"
                        />

                        <label> Password</label>
                        <input
                            // value={password} // this.state.password
                            onChange={event => this.genericSync(event)}
                            type="password"
                            name="password"
                            placeholder="***********"
                        />
                        <button> Login </button>
                    </form>
                    {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
                    {this.state.message && <div> {this.state.message} </div>}
                    
                </section>

            </div>

            /* 
            
            <div className="container_login">

            <div className="row">

                <div className="col-md-6 mt-5 mx-auto">

                    <form  onSubmit={this.onSubmit}>

                        <h1 className="h3 mb-3 font-weight-normal">
                            <span className='form_title_text'>Have an account already?</span>
                        </h1>

                        <div className="form-group">

                            <label htmlFor="email"><span className='form_text'>Email address</span></label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                autoComplete="email"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={event => this.genericSync(event)}
                            />
                        </div>

                        <div className="form-group">

                            <label htmlFor="password"><span className='form_text'>Password</span></label>
                            <input
                                type="password"
                                className="form-control"
                                autoComplete="current-password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={event => this.genericSync(event)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-lg btn-dark btn-block"
                        >

                            <span className='button_text'>Sign in</span>

                        </button>

                    </form>

                </div>

            </div> 
            </div>*/


        )
    }
}



export default Login