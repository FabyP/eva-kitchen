import React, { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = async () => {
    await axios
      .get("http://localhost:9000/menuitems")
      .then(function (response) {
        setMenuItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);
  return (
    <div className="container">
      {menuItems.map((menuItem) => (
        <p key={menuItem._id}>{menuItem.name}</p>
      ))}
    </div>
  );
};

export default Menu;
