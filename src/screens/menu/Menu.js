import React, { useEffect, useState } from "react";
import http from "../../http-common";
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

import "./Menu.css";
import { DeleteDialog, AddDialog } from "./menu-dialogs";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  function openDeleteDialog(id, name) {
    setIsDeleteOpen(true);
    setName(name);
    setId(id);
  }

  function openAddDialog() {
    setIsAddOpen(true);
  }

  const handleDeleteDialogClose = () => {
    setIsDeleteOpen(false);
  };

  const handleAddDialogClose = () => {
    setIsAddOpen(false);
  };

  

  const fetchMenuItems = async () => {
    await http
      .get("/menuitems")
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
      <Paper>
        <Toolbar className="tableToolbar">
          <Typography
            className="title"
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Speisekarte
          </Typography>
          <Tooltip title="Gericht hinzufügen">
            <IconButton
              aria-label="Gericht hinzufügen"
              className="tableButton"
              onClick={openAddDialog}
            >
              <AddIcon className="tableIcon mx-auto" />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Gericht</TableCell>
                <TableCell>Beschreibung</TableCell>
                <TableCell>Bild</TableCell>
                <TableCell>Zutaten</TableCell>
                <TableCell>Zusatzstoffe</TableCell>
                <TableCell align="right">Aktionen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menuItems.map((menuItem) => (
                <TableRow key={menuItem._id}>
                  <TableCell component="th" scope="row">
                    {menuItem.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {menuItem.description}
                  </TableCell>
                  <TableCell>
                    <img
                      src={menuItem.image}
                      className="tableImage"
                      alt={"Bild von Kategorie " + menuItem.name}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {menuItem.ingredients}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {menuItem.additive}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      className="tableButton"
                    >
                      <EditIcon className="tableIcon mx-auto" />
                    </IconButton>
                    <IconButton
                      className="tableButton" 
                      onClick={() =>
                        openDeleteDialog(menuItem._id, menuItem.name)
                      }
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
      <DeleteDialog
        isOpen={isDeleteOpen}
        handleClose={handleDeleteDialogClose}
        name={name}
        id={id}
      />
      <AddDialog isOpen={isAddOpen} handleClose={handleAddDialogClose} />
    </div>
  );
};

export default Menu;
