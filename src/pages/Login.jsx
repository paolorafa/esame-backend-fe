import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import FormAuthor from "../components/formAuthor/FormAuthor";

function Login() {
  const [loginData, setLoginData] = useState({});

  const navigate = useNavigate();

  const hadleInputChanged = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/login`, {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("loggedIn", JSON.stringify(data.token));
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const redirectForLoginWithGitHub = () => {
    window.location.href = `${process.env.REACT_APP_URL}/auth/github`;
   
  };
  useEffect(() => {
    // Controlla se c'è un token nel localStorage
    const tokenFromLocalStorage = localStorage.getItem("loggedIn");
  
    if (tokenFromLocalStorage) {
      // Il token è presente nel localStorage, reindirizza l'utente alla pagina "home"
      navigate("/home");
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center my-container">
        <div className="login-container-1 ">
          <FormAuthor />
        </div>
        <div className="d-flex flex-column align-items-center">
          <div className="login-container-2">
            <form className="login-form-2 " onSubmit={onSubmit}>
              <h3>Login</h3>
              <div className=" d-flex flex-column align-items-center gap-3 m-2">
                <div className="form-group">
                  <input
                    type="text"
                    className="btnSubmit"
                    name="email"
                    required
                    placeholder="Your Email *"
                    onChange={hadleInputChanged}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="btnSubmit"
                    name="password"
                    required
                    placeholder="Your Password *"
                    onChange={hadleInputChanged}
                  />
                </div>
                <div className="form-group ">
                  <input type="submit" className="btnSubmit" value="Login" />
                </div>
              </div>
            </form>
          </div>

          <div>
            <button
              onClick={() => redirectForLoginWithGitHub()}
              className="btnSubmit "
            >
              Entra con Github
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
