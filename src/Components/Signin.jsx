import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {

  //Define the two hooks for capturing/storing the user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Declare the three additional hooks that will be used to capture the three states of the application during the signin process
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  //Below is the useNavigate hook that will be used to redirect the user to another page after successful signin
  const navigate = useNavigate();

  //Below is the function that will handle the submission of the signin form
  const handleSubmit = async (e) => {
    //Below we prevent the default behavior of the form which is to refresh the page when submitted
    e.preventDefault();
    //Update our loading hook with a message
    setLoading("Authentication in progress...");

    try {
      //Create a form-data object that will hold the details entered on the form
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);
      //interact with axios for the response
      const response = await axios.post("https://sethstanley.alwaysdata.net/api/signin", formdata);
      //set the loading hook back to default
      setLoading("");
      //CHeck whether the user exists as part of your response from the API
      if (response.data.user) {
        //If the user is there, definitely the details entered during signin 
        //setSuccess("Login successful. Welcome back!");
        //If it is successful, let the user get redirected to the dashboard page

       // SAVE USER DATA IN LOCAL STORAGE
      localStorage.setItem("user", JSON.stringify(response.data.user));

      //Save login status
      localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      }
      else{
        //User is not found, that means the details entered in the form are incorrect
        setError("Invalid email or password. Please try again...");
      }
              setTimeout(() => {
    setSuccess("");
  }, 5000);

          setTimeout(() => {
    setError("");
  }, 5000);
  
    }
    catch (error) {
      //set loading back to default
      setLoading("");

      //Update the error hook with the error message from the response
      setError("Ooops, something went wrong. Please try again...");
    }
  };

  return (
    <>
    <div className='row justify-content-center mt-4'>
        <div className="card col-md-6 shadow p-4">
            <h1 className='text-primary'>Sign In</h1>
            <h5 className='text-info'>{loading}</h5>
            <h5 className='text-success'>{success}</h5>
            <h5 className='text-danger'>{error}</h5>
            
            <form onSubmit={handleSubmit}>
               <input type="email" 
                placeholder='Enter the email address here...'
                className='form-control'    
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                /> <br />

                {/* {email} */}

                <input type="password" 
                placeholder='Enter the password here...'
                className='form-control'    
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /> <br />
                {/* {password} */}

                <input type="submit" 
                value="Signin" 
                className='btn btn-primary' /> <br /><br />

                Don't have an account? <Link to={"/signup"}>Register</Link>
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

export default Signin;  

