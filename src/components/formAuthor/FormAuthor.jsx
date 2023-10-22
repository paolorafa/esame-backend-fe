import React, { useState } from "react";
import "./formauthor.css"

function FormAuthor() {
  const [register, setRegister] = useState({});
  const [registerComplete, setRegisterComplete] = useState(false);
  console.log(register);

  const handleInputChanged = (e) => {
    const { name, value } = e.target;

    setRegister({
      ...register,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/author/create`,
          {
            headers: {
              "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(register),
          }
        );
        const data = await response.json();
        setRegister(data);
        setRegisterComplete(true);
      } catch (e) {
        console.log(e);
      }
    } 

   


  return (
    <>
      
        {registerComplete ? (
          <div>
            <p>Registrazione effettuata con successo!</p>
          </div>
        ) : (
          <form className=" login-form-2 my-beck" onSubmit={onSubmit}>
            <h3>Registrati</h3>
            <div className=" d-flex flex-column align-items-center gap-3">
              <div className="form-group">
                <input
                  type="text"
                  className="btnSubmit"
                  name="name"
                  required
                  placeholder="Your name"
                  onChange={handleInputChanged}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="btnSubmit"
                  name="lastname"
                  required
                  placeholder="Your last name"
                  onChange={handleInputChanged}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="btnSubmit"
                  name="email"
                  required
                  placeholder="Your email"
                  onChange={handleInputChanged}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="btnSubmit"
                  name="password"
                  required
                  placeholder="Your password"
                  onChange={handleInputChanged}
                />
              </div>
              <div className="form-group ">
                <input type="submit" className="btnSubmit" value="Login" />
              </div>
            </div>

            
          </form>

         
         
        )}
        
      
    </>
  );
}

export default FormAuthor;
