import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { connectDataConnectEmulator } from "firebase/data-connect";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
const [success,setSuccess]=useState(false)
const [errorMessage,setErrorMessage]= useState('')
const emailRef = useRef()

    const handleLogin= e =>{
e.preventDefault()
const email = e.target.email.value
const password = e.target.password.value

console.log(email,password)
// reset success 
setSuccess(false)
// sign in user
signInWithEmailAndPassword(auth,email,password)
.then((result)=>{
    console.log(result.user)
    setSuccess(true)
})
.catch((error)=>{ console.log(error.message)
setErrorMessage(error.message)})
    }

    const handleForget=()=>{
        console.log('handle forget' ,emailRef.current.value)
        const email = emailRef.current.value
      if(!email){
        setErrorMessage("please provide a valid email")
      }else{
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert('password reset email send')
        })
        .catch((error)=>{
            console.log(error.message)
        })
      }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email"  ref={emailRef} placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input   type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label  onClick={handleForget} className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
           
            {
        errorMessage && <p className="text-red-500 p-2">{errorMessage}</p>
      }
      {
        success && <p className="text-green-500 p-2"> your login is successfully</p>
      }
      <p> you have no register going here <Link to='/register'>Register</Link></p>
          </div>
        </div>
      </div>
    );
};

export default Login;