// import React from "react";
import { useRef, useState, useEffect } from "react";
// import AuthContext from "./AuthProvider";
import axios from "./axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

const LOGIN_URL = "/api/v1/users/logIn";

const LogIn = () => {
  const navigate = useNavigate();
  const { setAuth,auth } = useAuth();
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  useEffect(() => {
    console.log("Authentication Data:", auth.accessToken);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, pwd);

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //console.log(response?.data.token)
      //console.log(JSON.stringify(response?.data));
      //localStorage.setItem("token", response.data.accessToken);
      const accessToken = response?.data.token;
      //console.log(accessToken)
      //console.log(localStorage.getItem("token"))
<<<<<<< HEAD
      // console.log(response.data.accessToken)

      setAuth({ email,pwd,accessToken });
     
      
=======
      //console.log(response.data.accessToken)
      
      setAuth({ email, pwd, accessToken });
>>>>>>> 7b6016dcee6331a60bfce2d2ca0d3cc55bb29915
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.log(err);
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email Or Password");
      } else if (err.response?.status === 404) {
        console.log(err);
        setErrMsg("Invalid Password");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button>Log In</button>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            {/*put router link here*/}
            <Link to="/">Sign Up</Link>
          </span>
        </p>
      </section>
      
    </>
  );
};

export default LogIn;
