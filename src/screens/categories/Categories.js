import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";

import "./Categories.css";

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

  function editCategory(id) {
    console.log("Category with id=" + id + " was clicked.");
  }

  function deleteCategory(id) {
    console.log("Category with id=" + id + " was clicked.");
  }

  return (
    <div className="container">
      <Paper>
        <Toolbar className="tableToolbar">
          <Typography className="title" variant="h6" id="tableTitle" component="div">
            Kategorien
          </Typography>
          <Tooltip title="Kategorie hinzufügen">
            <IconButton aria-label="Kategorie hinzufügen" className="tableButton">
              <AddIcon className="tableIcon mx-auto"/>
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Kategorie</TableCell>
                <TableCell>Bild</TableCell>
                <TableCell align="right">Aktionen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>
                  <TableCell>
                    <img
                      src={category.image}
                      className="tableImage"
                      alt={"Bild von Kategorie " + category.name}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      className="tableButton"
                      onClick={() => editCategory(category._id)}
                    >
                      <EditIcon className="tableIcon mx-auto" />
                    </IconButton>
                    <IconButton
                      className="tableButton"
                      onClick={() => deleteCategory(category._id)}
                    >
                      <DeleteIcon className="tableIcon mx-auto" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Categories;
