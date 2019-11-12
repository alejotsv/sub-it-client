import React from "react";
import axios from "axios";

export const register = newUser => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/signup`, {
      // `${process.env.REACT_APP_API_URL}/some-route`
      userName: newUser.userName,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/login`, {
      userName: user.userName,
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
      
    })
    .catch(err => {
      console.log(err)
    })
}


// export const project = newProject => {
//   return axios
//     .post(`${process.env.REACT_APP_API_URL}/dashboard/create-project`, {
//       title: newProject.title,
//       genre: newProject.genre,
//       fileName: newProject.fileName,
//       description: newProject.description,
//       language: newProject.language,

//     })
//     .then(response => {
//       console.log('Project Created!')
//     })
    
// }

// export const getProfile = user => {
//   return axios
//     .get('/dashboard', {
//       headers: { Authorization: ` ${this.getToken()}` }
      
//     })
//     .then(response => {
//       return response.data
//       // console.log(user)
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }

// export const checkUser = user => {
//   return axios
//     .get('/api/checkuser', {
      
      
//     })
//     .then(response => {
//       return response.data
//       // console.log(user)
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }

