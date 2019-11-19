import React, { Component } from 'react'
import axios from "axios";



class Login extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            email: "",
            password: "",
            addClass: false,
            message: null,
        }
    }

    // Changes state values for change in text fields
    genericSync(event) {
        // console.log("==============================================================Target is: ", event.target)
        // console.log("==============================================================Value is: ", event.target.value)
        // Destructure to get naame and value for target 
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


    handleLogin(event) {

        console.log("submitting form from clean");
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
                console.log(this.state)
                const { userDoc } = responseFromServer.data;

                console.log(`Here is the user logged in info: `, userDoc)


                // Update Parent State to know user is now signed in
                this.props.onUserChange(userDoc);
                console.log(`~~~~~~~~~~~~~ USER DOC`, userDoc);

                // Go to User Dashboard after logging in
                // this.props.history.push(`/dashboard/${userDoc._id}`)

                // Users Projects after sign in

                // Project List Comoponent to see if its working after login
                this.props.history.push(`/user-dashboard`)

            })
            .catch(err => {
                console.log("err: ", err.response)
                if (err) return this.setState({ message: err })
            });
    }

    handleSignup(event) {

        console.log("submitting form from for signup");
        event.preventDefault();

        axios.post(

            // route we are hitting in the backend to login
            `${process.env.REACT_APP_API_URL}/signup`,
            // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
            this.state,
            // secure sending
            { withCredentials: true }
        )
            .then(responseFromServer => {

                console.log("response from back end is:", responseFromServer.data);
                // console.log("do I have any props ????????? ", this.props)
                console.log(this.state)
                const { userDoc } = responseFromServer.data;

                console.log(`Here is the user logged in info: `, userDoc)


                // Update Parent State to know user is now signed in
                this.props.onUserChange(userDoc);
                console.log(`~~~~~~~~~~~~~ USER DOC`, userDoc);

                // Go to User Dashboard after logging in
                // this.props.history.push(`/dashboard/${userDoc._id}`)

                // Users Projects after sign in

                // Project List Comoponent to see if its working after login
                this.props.history.push(`/user-dashboard`)

            })
            .catch(err => {
                console.log("err: ", err.response)
                if (err) return this.setState({ message: err })
            });
    }

    toggleSignup() {
        this.setState({ addClass: !this.state.addClass })
    }

    render() {

        return (

            <div className="user-form__body">

                {/* TODO Add right-panel-active class to this class if sign up is clicked true, don't if its false*/}
                <div className={this.state.addClass ? "user-form__container right-panel-active" : "user-form__container"} id="user-form__container">

                    <div className="user-form__form-container user-form__sign-up-container">

                        <form className="user-form__form" onSubmit={event => this.handleSignup(event)} >

                            <h1>Create Account</h1>

                            <div className="social-container">
                                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>

                            <span className="user-form__span">or use your email for registration</span>
                            <input className="user-form__input" onChange={event => this.genericSync(event)} type="text" name="userName" placeholder="name" />
                            <input className="user-form__input" onChange={event => this.genericSync(event)} type="email" name="email" placeholder="Email" />
                            <input className="user-form__input" onChange={event => this.genericSync(event)} type="password" name="password" placeholder="Password" />

                            <button >Sign Up </button>

                        </form>

                    </div>

                    <div className="user-form__form-container user-form__sign-in-container">

                        <form className="user-form__form" onSubmit={event => this.handleLogin(event)}>

                            <h1>Sign in</h1>
                            <div className="social-container">
                                <a className=".user-form__a" href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a className=".user-form__a" href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a className=".user-form__a" href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>

                            <span className="user-form__span">or use your account</span>
                            <input className="user-form__input" onChange={event => this.genericSync(event)} type="email" name="email" placeholder="Email" />
                            <input className="user-form__input" onChange={event => this.genericSync(event)} type="password" name="password" placeholder="Password" />

                            {/* <a href="#">Forgot your password?</a> */}
                            <button >Sign In</button>

                        </form>
                    </div>

                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p className="user-form__p">To keep connected with us please login with your personal info</p>
                                <button className=" user-form__button ghost" id="signIn" onClick={this.toggleSignup.bind(this)}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p className="user-form__p">Enter your personal details and start journey with us</p>
                                <button className=" user-form__button ghost" id="signUp" onClick={() => this.toggleSignup()}>Sign Up</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        )
    }
}



export default Login