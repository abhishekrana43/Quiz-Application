import React from 'react'
import { loginStyles, navbarStyles } from '../assets/dummyStyles'
import { Link } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, LogIn } from 'lucide-react'
import { Mail, Lock } from 'lucide-react'


const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const Login = (onLoginSuccess = null) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!isValidEmail(email)) e.email = "Please enter a valid email";

    if (!password) e.password = "Password is required";
    return e;
  };


  return (
    <div className={loginStyles.pageContainer}>
        <div className={loginStyles.bubble1}>
         <div className={loginStyles.bubble2}>

         </div>
        </div> 

        <Link to='/' className={loginStyles.backButton}>
        <ArrowLeft className={loginStyles.backButton} />
        <span className={loginStyles.backButtonText}>Home</span>
        </Link>

        <div className={loginStyles.formContainer}>
            <form onSubmit={handleSubmit} className={loginStyles.form} noValidate>
                <div className={loginStyles.formWrapper}>
                    <div className={loginStyles.animatedBorder}>
                        <div className={loginStyles.formContent}>
                            <h2 className={loginStyles.heading}>
                                <span className={loginStyles.headingIcon}>
                                    <Login className={loginStyles.headingIconInner}/>
                                </span>

                                <span className={loginStyles.headingText}>Login</span>

                            </h2>

                            <p className={loginStyles.subtitle}>
                                Sign in to continue to Quiz Apllication. Light, clean UI - smooth micro-animations and easy validations
                            </p>

                            <label className={loginStyles.label}>
                                <span className={loginStyles.labelText}>Email</span>
                                <div className={loginStyles.inputContainer}>
                                    <span className={loginStyles.inputIcon}>
                                      <Mail className ={loginStyles.inputIconInner} />

                                    </span>
                                    <input type="email"  name='email' value={email} onChange={(e) => {
                                        setEmail(e.target.value);
                                        if(errors.email)
                                            setErrors((s) => ({
                                             ...s,
                                             email:undefined,
                                        }));
                                    }}
                                     className={`${loginStyles.input} ${
                                       errors.email
                                         ? loginStyles.inputError
                                         : loginStyles.inputNormal
                                     }`}
                                     
                                     placeholder='your@example.com'
                                     required
                                    />
                                </div>
                                {errors.email && (
                                    <p className={loginStyles.errorText}>{errors.email}
                                    </p>
                                )}
                            </label>

                             <label className={loginStyles.label}>
                                <span className={loginStyles.labelText}>Password</span>
                                <div className={loginStyles.inputContainer}>
                                    <span className={loginStyles.inputIcon}>
                                      <Lock className ={loginStyles.inputIconInner} />

                                    </span>
                                    <input 
                                    type={showPassword ? 'text':"password"}  
                                    name='password' 
                                    value={password}
                                     onChange={(e) => {
                                        setEmail(e.target.value);
                                        if(errors.password)
                                            setErrors((s) => ({
                                             ...s,
                                             password:undefined,
                                        }));
                                    }}
                                     className={`${loginStyles.input} ${loginStyles.passwordInput} ${
                                       errors.password
                                         ? loginStyles.inputError
                                         : loginStyles.inputNormal
                                     }`}
                                     
                                     placeholder='Enter Your Password'
                                     required
                                    />
                                    {/* Toggle Button */}
                                    
                                    <button type='button' onClick={() => setShowPassword((s) => !s)} className={loginStyles.passwordToggle}>
                                        {showPassword ? (
                                            <EyeOff className={loginStyles.passwordToggleIcon} />

                                        ) : (
                                            <Eye className={loginStyles.errorText}>{errors.password}</Eye>
                                        )}
                                    </button>
                    
    
                                </div>
                                {errors.email && (
                                    <p className={loginStyles.errorText}>{errors.email}
                                    </p>
                                )}
                            </label>

                            {submitError && (
                                <p className={loginStyles.submitError}>{submitError}</p>
                            )}

                            <div className={loginStyles.buttonsContainer}>
                                <button type='submit'
                                 className={loginStyles.submitButton}
                                 disabled={loading}
                                 >
                                   {loading ? (
                                    "Signing in..."
                                   ): (
                                    <>
                                    <LogIn className={loginStyles.submitButtonIcon} />
                                    <span className={loginStyles.submitButton}>
                                        Sign in
                                    </span>
                                    </>
                                   )}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
