// import React, { Component } from "react";
// // import the service file since we need it to send (and get) the data to(from) server
// // import service from '../api/service';


// class Projectform extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           title: "",
//           genre: "",
//           description: "",
//           language: "",
//           videoURL: ""
//         };
//     }
    
//     handleChange = e => {  
//         const { name, value } = e.target;
//         this.setState({ [name]: value });
//     }

//     // this method handles just the file upload
//     handleFileUpload = e => {
//         console.log("The file to be uploaded is: ", e.target.files[0]);

//         const uploadData = new FormData();
//         // imageUrl => this name has to be the same as in the model since we pass
//         // req.body to .create() method when creating a new thing in '/api/things/create' POST route
//         uploadData.append("videoURL", e.target.files[0]);
        
//         service.handleUpload(uploadData)
//         .then(response => {
//             // console.log('response is: ', response);
//             // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
//             this.setState({ videoURL: response.secure_url });
//             console.log(this.state.videoURL)
//           })
//           .catch(err => {
//             console.log("Error while uploading the file: ", err);
//           });
//     }

//     // this method submits the form
//     handleSubmit = e => {
//         e.preventDefault();
        
//         service.saveNewProject(this.state)
//         .then(res => {
//             console.log('added: ', res);
//             console.log(res)

//             this.props.history.push('/dashboard');
//             // here you would redirect to some other page 
//         })
//         .catch(err => {
//             console.log("Error while adding the thing: ", err);
//         });
         
                
//     }  

  
        
//     render() {
        
//         return (
//             <div className="container_project">
//                     <div className="row">
//                       <div className="col-md-6 mt-5 mx-auto">
//                       <form noValidate onSubmit={e => this.handleSubmit(e)} crossOrigin="anonymous">
//                       <h1 className="h3 mb-3 font-weight-normal"><span className='form_title_text'>
//                             Create a Project</span></h1>
//                             <br/>
//                             <br/> 
//                             <div className="custom-file">
                  
//                  <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={(e) => this.handleFileUpload(e)} />
//                 <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
//                         </div> 
//                         <br/>
//                         <br/>
//                          <div className="form-group">
//                            <label htmlFor="title"><span className='form_text'>Title</span></label>
//                            <input
//                               type="text"
//                               className="form-control"
//                               name="title"
//                               placeholder="Give it a title"
//                               value={this.state.title}
//                               onChange={ e => this.handleChange(e)} 
//                             />
//                           </div>
//                           <div className="form-group">
//                             <label htmlFor="genre"><span className='form_text'>Category</span></label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="genre"
//                               placeholder="Category"
//                               value={this.state.genre}
//                               onChange={ e => this.handleChange(e)}
//                             />
//                           </div>
//                           <div className="form-group">
//                             <label htmlFor="description"><span className='form_text'>What is it about?</span></label>
//                             <textarea
//                               type="text"
//                               className="form-control"
//                               name="description"
//                               placeholder="description"
//                               value={this.state.description}
//                               onChange={ e => this.handleChange(e)}
//                             />
//                           </div>
//                           <div className="form-group">
//                             <label htmlFor="language"><span className='form_text'>Target language</span></label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="language"
//                               placeholder="language"
//                               value={this.state.language}
//                               onChange={ e => this.handleChange(e)}
//                             />
//                           </div>
//                           <button type="submit" className="btn btn-lg btn-dark btn-block">
//                             <span className='button_text'>Save your project</span>
//                           </button>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
        
//         );
//     }
// }

// export default Projectform;






