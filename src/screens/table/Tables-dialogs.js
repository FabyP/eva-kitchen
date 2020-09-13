import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

import http from "../../http-common";
import "./Tables-dialogs.css";

export const AddDialog = ({ isOpen, handleClose }) => {
  const [name, setName] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const table = { TableName: name };

    http
      .post("/table/", table)
      .then(function () {
        console.log("added");
      })
      .catch(function (error) {
        console.log(error);
      });

    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Tisch hinzufügen</DialogTitle>
      <DialogContent>
        <DialogContentText>Bitte füllen Sie das Feld aus.</DialogContentText>
        <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" className="secondaryBtn">
          Abbrechen
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          className="primaryBtn"
          type="submit"
        >
          Erstellen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export const DeleteDialog = ({ isOpen, id, name, handleClose }) => {
  function handleConfirm() {
    http
      .delete("/table/" + id)
      .then(function () {
        console.log("deleted");
      })
      .catch(function (error) {
        console.log(error);
      });
    handleClose();
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Löschen?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Sind sie sicher, dass Sie "{name}" wirklich löschen möchten?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="secondary"
          className="secondaryBtn"
        >
          Abbrechen
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          className="primaryBtn"
          autoFocus
        >
          Löschen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export const EditDialog = ({ isOpen, id, tableName, handleClose }) => {
  const [name, setName] = useState("");

  function handleConfirm(evt) {
    evt.preventDefault();
    if (name !== "") {
      http
        .patch("/table/" + id, { TableName: name })
        .then(function () {
          console.log("edited");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    handleClose();
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Editieren"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          "{tableName}" bearbeiten.
        </DialogContentText>
        <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          defaultValue={tableName}
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="secondary"
          className="secondaryBtn"
        >
          Abbrechen
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          className="primaryBtn"
          autoFocus
        >
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
};
