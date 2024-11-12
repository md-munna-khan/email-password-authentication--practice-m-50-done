import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
const [errorMessage,setErrorMessage]= useState('')
const [success,setSuccess] = useState('')
const [showPassword,setShowPassword] =useState(false)

    const handleLogin = e =>{
  e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const terms = e.target.terms.checked
        console.log(email,password,terms)

        // reset error and status
        setErrorMessage('')
        // reset success and status
  setSuccess('')
 

   
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
if(!passwordRegex.test(password)){
    setErrorMessage("not fullfill our terms and condition")
    return
}

  // password 6 character
  if(password.length <6){
    setErrorMessage("password must be 6 character or longer")
    return
  }
   // terms
   if(!terms){
    setErrorMessage("please accept our terms and condition")
    return
  }
        // create user
        createUserWithEmailAndPassword (auth,email,password)
        .then((res)=>{
            console.log(res.user)
            if(res.user.emailVerified){
                setSuccess(res.user)
            }else{
                setErrorMessage("please verify your email")
            }
               
        

            // send email verification
            sendEmailVerification(auth.currentUser)
            .then(()=>{
                console.log("email verification send")
            })
        })
       .catch(error=>{ console.log(error.message);
       setErrorMessage(error.message)})   
     }
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
     
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
           type={showPassword ? 'text': "password"}
            name='password' placeholder="password" className="input input-bordered" required />
          <button 
          onClick={()=>setShowPassword(!showPassword)}
          className="absolute right-2 top-12"> 
          {
            showPassword ? <FaEyeSlash></FaEyeSlash>: <FaEye></FaEye>
          }
        </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
  <label className="cursor-pointer justify-start label">
  <input type="checkbox" name="terms"  className="checkbox checkbox-warning" />
    <span className="label-text ml-2">Accept our terms and condition</span>
 
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
      <p className="p-2">You have already account please <Link to="/login"> login</Link></p>
    </div>
  </div>
</div>
    );
};

export default Register;