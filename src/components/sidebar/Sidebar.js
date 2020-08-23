import React from "react";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faUtensils,
  faQrcode,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";

const Sidebar = () => {
  return (
    <div className="sidebar" id="sidebar">
      <Nav className="flex-column">
        <Nav.Link href="/order">
          <FontAwesomeIcon icon={faTasks} />
          Bestellungen
        </Nav.Link>
        <Nav.Link href="/table">
          <FontAwesomeIcon icon={faQrcode} />
          Tische
        </Nav.Link>
        <Nav.Link href="/menu">
          <FontAwesomeIcon icon={faUtensils} />
          Speisekarte
        </Nav.Link>
        <Nav.Link href="/categories">
          <FontAwesomeIcon icon={faThLarge} />
          Kategorien
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
