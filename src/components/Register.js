import React, { Component } from 'react'
import { register } from './UserFunctions'
import { login } from './UserFunctions'
// Components Imported
// import { GoogleLogin } from 'react-google-login';

class Register extends Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password
    }

    register(newUser)
      .then(res => {

        // ************************************************************

        // Get user information
        const user = {
          userName: this.state.userName,
          email: this.state.email,
          password: this.state.password,
        }

        // Set current user
        const { userName } = this.state;
        localStorage.setItem('currentUser', userName);

        // Imported from user function
        // Login the user after they sign up
        login(user).then(res => {
          if (res) {
            console.log(res.userDoc.userName)
            localStorage.setItem('currentUserId', res.userDoc._id);
            localStorage.setItem('currentUserName', res.userDoc.userName);

            this.props.history.push(`/dashboard/${res.userDoc._id}`)
          }
          else {
            alert('Please, provide correct credentials')
          }
        })

      })
  }

  render() {

    const responseGoogle = (response) => {
      console.log(response);
    }

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
                style={{ opacity: "0.8" }}>
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