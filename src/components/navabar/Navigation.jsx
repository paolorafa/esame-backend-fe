import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Mylogo from "../../assets/duotone-ogimage.jpeg";
import Logout from "../logout/Logout";

function Navigation() {
  return (
    <div>
     
      <Navbar className="bg-body-white">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={Mylogo}
              width={200}
              height={70}
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Container>
        <Logout/>
      </Navbar>
    </div>
  );
}

export default Navigation;
