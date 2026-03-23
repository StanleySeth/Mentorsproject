import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
    //Initialize the hooks
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [phone, setPhone] = useState("");

//Define the three states an application will move to during the signup process
const [loading, setLoading] = useState("");
const [success, setSuccess] = useState("");
const [error, setError] = useState("");

//Below is the function that will handle the submission of the signup form
 const handleSubmit = async (e) => {
    //Below we preventt the default behavior of the form which is to refresh the page when submitted
    e.preventDefault(); 
    //Update our loading hook that will be displayed to the users when they click the signup button
    setLoading("Please wait as registration is in progress...");
    try {
        //Create a form-data object that will enable you to capture the form details entered on the form
        const formdata = new FormData();
        //Insert the four details in terms of key-value pairs
        formdata.append("username", username);
        formdata.append("email", email);
        formdata.append("password", password);
        formdata.append("phone", phone);

        //By use of axios, we can access the method post
        const response =await axios.post("https://sethstanley.alwaysdata.net/api/signup", formdata)
        //set back the loading to default

        setLoading("");
        //Just incase everything goes on well update the success hook with a message
        setSuccess(response.data.message)

        //Clear your hooks 
        setUsername("");
        setEmail("");
        setPassword("");
        setPhone("");   

         setTimeout(() => {
    setSuccess("");
  }, 5000);
  

    }
    catch (error) {
        //set back the loading hook to default
        setLoading("");
        //Update the error hook with the error message from the response
        setError(error.message);


    }
 };


  return (
    <>
    <div className='row justify-content-center mt-4'>
        <div className="card col-md-6 shadow p-4">
            <h1 className='text-primary'>Sign Up</h1>
            <h5 className="text-warning">{loading}</h5>
            <h3 className="text-success">{success}</h3>
            <h4 className="text-danger">{error}</h4>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                placeholder='Enter the Username'
                className='form-control'    
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                required /> <br />

                {/*Username */}

                <input type="email" 
                placeholder='Enter the email Address'
                className='form-control' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required /> <br />
                    {/*Email Address */}


                <input type="password" 
                placeholder='Enter the password'
                className='form-control' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required /> <br />
                    {/*Password */}

                <input type="tel" 
                placeholder='Enter the Mobile Phone number'
                className='form-control' 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required /> <br />
                    {/*Mobile Phone number */}

                <input type="submit"  value="Signup" className='btn btn-primary'/>
                <br /><br />

                Already have an account? <Link to={"/signin"}>Signin</Link>
            </form>
        </div>
        {/* ✅ FOOTER ADDED HERE */}
    <footer className="bg-dark text-light mt-5 p-4 text-center">
      <div className="container">
        <h5>MentorConnect</h5>
        <p>Empowering your growth through expert mentorship.</p>

        <div className="d-flex justify-content-center gap-3 mb-3">
          <a href="/" className="text-light">Home</a>
          <a href="/about" className="text-light">About Us</a>
          <a href="/contact" className="text-light">Contact</a>
        </div>

        <small>© {new Date().getFullYear()} MentorConnect. All rights reserved.</small>
      </div>
    </footer>
    </div>
    </>
  )
}

export default Signup;
