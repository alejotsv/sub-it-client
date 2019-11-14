import React, { Component } from 'react'
import axios from "axios";
import { register } from './UserFunctions'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      email: '',
      password: ''
      // ,errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {

    e.preventDefault()

    // const newUser = {
    //   userName: this.state.userName,
    //   email: this.state.email,
    //   password: this.state.password
    // }

    // register(newUser).then(res => {
    //   this.props.history.push(`/login`)
    // })


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

  render() {
    return (
      <div className="container_register">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal"><span className='form_title_text'>Create an account</span></h1>
              <div className="form-group">
                <label htmlFor="name"><span className='form_text'>Name</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="userName"
                  autoComplete="username"
                  placeholder="Enter your name"
                  value={this.state.userName}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email"><span className='form_text'>Email address</span></label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
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
                  onChange={this.onChange}
                />
              </div>
              <button type="submit"
                className="btn btn-lg btn-dark btn-block"
              >
                <span className='button_text'>Register</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register