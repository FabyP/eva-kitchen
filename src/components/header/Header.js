import React from "react";
import { Navbar, NavbarBrand } from "react-bootstrap";
import "./Header.css";
import Logo from "../../logo.svg";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={Logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Evas Restaurant
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Eingeloggt als: <a href="#login">Test User</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
