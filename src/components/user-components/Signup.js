import React from "react";
import axios from "axios";

/* TODO

1. Sign Up Not Working
2. Redirect user if they got to user projects page but are not signed in 
3. 

*/
export default class Signup extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            fullName: "",
            email: "",
            password:"",
            message: null
        }
    }

    genericSync(event){
        // console.log("what is: ", event.target.value)
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit (event){
        // console.log("submitting form");
        event.preventDefault();

        axios.post(
            // route we are hitting in the backend
            `${process.env.REACT_APP_API_URL}/signup`,
            // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
            this.state,
            // secure sending
            { withCredentials: true }
        )
        .then( responseFromServer => {
            console.log("response is:", responseFromServer);
            const { userDoc } = responseFromServer.data;
            this.props.onUserChange(userDoc);
        })
        .catch( err => console.log("Err in signup: ", err));
    }

    render(){
        console.log("Do I have user in Signup: ", this.props.currentUser)
        const { fullName, email, password } = this.state;
        
        // If user is signed in
        if(this.props.currentUser){
            return(
                <div>
                    <h2> Welcome to your app, { this.props.currentUser.fullName } ! You're signed in! </h2>
                </div>
            )
        }

        return (
            <section>

                <h2> Sign up </h2>

                <form onSubmit ={ event => this.handleSubmit(event) } >
                    <label> Full name: </label>
                    <input
                        value={fullName} // this.state.fullName
                        onChange = { event => this.genericSync(event) } 
                        type="text"
                        name="fullName"
                        placeholder="John Smith"
                    />

                     <label> Email: </label>
                    <input
                        value={email} // this.state.email
                        onChange = { event => this.genericSync(event) } 
                        required
                        type="email"
                        name="email"
                        placeholder="my-email@ironhack.com"
                    />

                    <label> Password</label>
                    <input
                        value={password} // this.state.password
                        onChange = { event => this.genericSync(event) } 
                        required
                        type="password"
                        name="password"
                        placeholder="***********"
                    />

                    <button> Sign Up </button>

                </form>

                {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
                { this.state.message && <div> { this.state.message } </div> }

            </section>

        )
    }
}