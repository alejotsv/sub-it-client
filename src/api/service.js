// api/service.js
import axios from 'axios';

const service = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/`,
  // withCredentials: true // => you might need this when having the users in the app 
});

const errorHandler = err => {
  // console.error(err);
  throw err;
};

export default {
  service,

  handleUpload (theFile) {
    // console.log('file in service: ', theFile)
    return service.post('/upload', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewProject (newProject) {
    const theUserId = localStorage.getItem('currentUserId');
    console.log('new project is: ', newProject)
    return service.post(`create-project/${theUserId}`, newProject)
      .then(res => res.data)
      .catch(errorHandler);
  }
}



