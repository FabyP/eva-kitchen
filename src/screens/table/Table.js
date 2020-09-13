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

import { DeleteDialog, AddDialog, EditDialog } from "./Tables-dialogs";

import "./Table.css";

var QRCode = require("qrcode.react");

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  function openAddDialog() {
    setIsAddOpen(true);
  }

  const handleAddDialogClose = () => {
    setIsAddOpen(false);
  };

  function openDeleteDialog(id, name) {
    setIsDeleteOpen(true);
    setName(name);
    setId(id);
  }

  const handleDeleteDialogClose = () => {
    setIsDeleteOpen(false);
  };

  function openEditDialog(id, name) {
    setIsEditOpen(true);
    setName(name);
    setId(id);
  }

  function handleEditDialogClose() {
    setIsEditOpen(false);
  }

  const fetchTables = async () => {
    await http
      .get("/tables")
      .then(function (response) {
        setTables(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchTables();
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
            Tische
          </Typography>
          <Tooltip title="Tisch hinzufügen">
            <IconButton
              aria-label="Tisch hinzufügen"
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
                <TableCell>Tisch</TableCell>
                <TableCell>QR-Code</TableCell>
                <TableCell align="right">Aktionen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tables.map((table) => (
                <TableRow key={table._id}>
                  <TableCell component="th" scope="row">
                    {table.TableName}
                  </TableCell>
                  <TableCell>
                    <QRCode size={80} value={table.QRCodeLink} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      className="tableButton"
                      onClick={() =>
                        openEditDialog(table._id, table.TableName)
                      }
                    >
                      <EditIcon className="tableIcon mx-auto" />
                    </IconButton>
                    <IconButton
                      className="tableButton"
                      onClick={() =>
                        openDeleteDialog(table._id, table.TableName)
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
      <AddDialog isOpen={isAddOpen} handleClose={handleAddDialogClose} />
      <DeleteDialog
        isOpen={isDeleteOpen}
        handleClose={handleDeleteDialogClose}
        name={name}
        id={id}
      />
      <EditDialog
        isOpen={isEditOpen}
        handleClose={handleEditDialogClose}
        tableName={name}
        id={id}
      />
    </div>
  );
};

export default Tables;
