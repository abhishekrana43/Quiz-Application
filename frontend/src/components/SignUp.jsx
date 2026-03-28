import React, { useState } from 'react'
import { signupStyles } from '../assets/dummyStyles';
import { replace, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const SignUp = ({onSignupSuccess = null}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
   const e = {};
    if(!name.trim()) e.name = "Name is required";
    if (!email) e.email = "Email is required";
    else if (!isValidEmail(email)) e.email = "Please enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6)
        e.password  = "Password must be atleast 6 characters";
    return e;
  };

  const API_BASE="http://localhost:4000";

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitError('');
    const v = validate();
    setErrors(v);
    if(Object.keys(v).length) return;

    setLoading(true);

    try {
        const payload = {
            name:name.trim(),
            email:email.trim().toLowerCase(),
            password,

        }

        const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
 
      let data = {};
      const text = await response.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.warn("Invalid JSON response:", parseError);
      }

       if (!response.ok) {
        const msg = data?.message || "Register Failed";
        setSubmitError(msg);
        return;
      }

       if (data?.token) {
        try {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem(
            "currentUser",
            JSON.stringify(data.user || { 
                email: email.trim().toLowerCase(),
                name:name.trim(),
             })
          );
        } catch (storageError) {
          console.warn("LocalStorage error:", storageError);
        }
      }
     
      if(typeof onSignupSuccess === "function"){

        try {
            onSignupSuccess(
                data.user || {
                    name:name.trim(),
                    email: email.trim().toLowerCase(),

                }
            )
        } catch (error) {
            
        }
      }
      
      navigate("/login", {replace: true});

    } catch (err) {
        console.error("Signup error:",err);
        setSubmitError("Network Error");

    }
    finally{
        setLoading(false);
    }
  }

  return (
    <div className={signupStyles.pageContainer}>
      <Link to='/login' className={signupStyles.backButton} >
      <ArrowLeft className={signupStyles.backButton} />
      <span className={signupStyles.backButtonText}>Back</span>
      </Link>

      <div className={signupStyles.formContainer}>
        <form onSubmit={handleSubmit}>
            <div className={signupStyles.animatedBorder}>
                <div className={signupStyles.formContainer}>
                    <h2 className={signupStyles.heading}>
                        <span className={signupStyles.headingIcon}>
                            <CheckCircle className={signupStyles.headingIconInner} />
                            
                        </span>

                        <span className={signupStyles.headingText}>Create Account</span>
                    </h2>
                </div>
            </div>
        </form>
      </div>
        
      
    </div>
  )
}

export default SignUp
