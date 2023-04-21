import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {signIn, useSession} from "next-auth/react";
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogle = async(e) => {
    e.preventDefault();
    // TODO: add login functionality here
    signIn('google',{callbackUrl : "http://localhost:3000"})
  };

  return (
    <>
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <div class="d-grid gap-2 mx-auto">
                                <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
                                <p>Don't have an account?  <Link href="/register">Register here</Link> </p>
                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                </div>
                                <a className="btn btn-primary btn-lg btn-block" style={{backgroundColor: '#3b5998'}} href="#!" role="button" onClick={handleGoogle}>
                                    <img width="18px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>    Continue with Gmail
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
};

export default Login;