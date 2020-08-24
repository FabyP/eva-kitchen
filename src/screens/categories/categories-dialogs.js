import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import PropTypes from "prop-types";
import http from "../../http-common";

export const DeleteDialog = ({ isOpen, id, name, handleClose }) => {
  function handleConfirm() {
    http
      .delete("/category/" + id)
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
          Sind sie sicher, dass Sie die Kategorie "{name}" wirklich löschen
          möchten?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
};
