import React, { Component } from 'react'
import Main from './Main';
import Footer from './Footer';


class Home extends Component {
  render() {
    return (
         <div>
           <Main />
           <Footer/>
          </div>
    )
  }
}

export default Home



// import React from "react";


// export default class Home extends React.Component {

//     render(){
//         return (
//             <section>
//                 <h1> Home Page </h1>
//                 <p> Welcome to the best app ever!  </p>
//             </section>
//         )
//     }
// }