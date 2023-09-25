import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../Shared/Firebase/Firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);






const Login = () => {
    const [logSuccess, setLogSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [checkAlert, setCheckAlert] = useState('');

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const form = e.target;
            
        const email =form.email.value;
        const password = form.password.value;
        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            setLogSuccess(true);
            form.reset();
        })
        .catch (error => console.log(error))
    }

    const handleEmailBlur = (e) =>{
        // e.preventDefault();
        const email = e.target.value;
        console.log(email);
        setUserEmail(email);
    }

    const handleForgetPassword = () =>{
        if(!userEmail){
            alert("Please Enter Your Email Address")
            return false;
        }
        // Send Email Reset Password 
        sendPasswordResetEmail(auth, userEmail)
        .then(()=>{
            setCheckAlert("Check You Email Address And Reset Password");
            // document.getElementById('error').classList.add('success')
        }).catch((error)=>{
            error;
        })
    }

    return (
        <div className='container w-50 mx-auto my-5 shadow p-5 rounded-3 background_col'>
            <form onSubmit={handleOnSubmit} className='  '>
                <h4 className='text-center'>Please Login </h4>
                {
                    checkAlert
                }
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input onBlur = {handleEmailBlur} type="email" name='email' className="form-control"  aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" required  />
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" name="checkbox" className="form-check-input"  />
                    <label className="form-check-label" >Check me out</label>
                </div> */}
                <p>New User In a website <Link to='/register'>Please Register</Link></p>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                {
                    logSuccess && <p className='text-danger'>Successfully Login</p>
                }
            </form>
                <p><span>Forget Password? <button onClick={handleForgetPassword} className='btn btn-link'>Please Reset Password</button></span></p>
        </div>
    );
};

export default Login;