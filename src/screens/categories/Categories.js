import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    await axios
      .get("http://localhost:9000/categories")
      .then(function (response) {
        setCategories(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container">
      {categories.map((category) => (
        <p key={category._id}>{category.name}</p>
      ))}
    </div>
  );
};

export default Categories;
