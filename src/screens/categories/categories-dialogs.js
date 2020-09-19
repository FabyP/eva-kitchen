import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import ImageUploader from "react-images-upload";
import PropTypes from "prop-types";
import InputLabel from '@material-ui/core/InputLabel';

import http from "../../http-common";
import "./categories-dialogs.css";

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
        <Button onClick={handleClose} color="secondary" className="secondaryBtn">
          Abbrechen
        </Button>
        <Button onClick={handleConfirm} color="primary" className="primaryBtn" autoFocus>
          Löschen
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

export const AddDialog = ({ isOpen, id , handleClose }) => {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState({});

  

  const onDrop = (picture) => {
    setPicture(picture[0]);
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let imgBase64 = await toBase64(picture);
    const category = { name: name, imageData: imgBase64 };

    http
      .post("/category/", category, /* {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    } */).then(function () {
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
      <DialogTitle id="form-dialog-title">Kategorie hinzufügen</DialogTitle>
      <DialogContent>
        <DialogContentText>Bitte füllen Sie die Felder aus.</DialogContentText>
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
        <ImageUploader
          withIcon={true}
          buttonText="Upload"
          onChange={onDrop}
          imgExtension={[".jpg", ".png"]}
          maxFileSize={5242880}
          singleImage={true}
          withPreview={true}
          buttonStyles={{ backgroundColor: "#13aa52" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" className="secondaryBtn">
          Abbrechen
        </Button>
        <Button onClick={handleSubmit} color="primary" className="primaryBtn" type="submit">
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

export const EditDialog = ({ isOpen, categoryitem, handleClose }) => {
  const [name, setName] = useState(categoryitem.name);
  const [picture, setPicture] = useState([]);
  const [image, setImage] = useState(categoryitem.image);


  const onDrop = (picture) => {
    setPicture(picture[0]);
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


  async function handleConfirm (evt) {
    evt.preventDefault();
    var categoryitems = { 
      name: name,
    };
    if(picture !== null && !Array.isArray(picture)) {
      let imgData = await toBase64(picture);
      categoryitems.imageData = imgData;
    }
    console.log("aaa", categoryitems);

    // evt.preventDefault();
    if (categoryitems !== "") {
      http
        .patch("/category/" + categoryitem._id, categoryitems)
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
          "{categoryitem.name}" bearbeiten.
        </DialogContentText>
        <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          defaultValue={categoryitem.name}
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
        <ImageUploader
          withIcon={true}
          buttonText="Upload"
          onChange={onDrop}
          imgExtension={[".jpg", ".png"]}
          maxFileSize={5242880}
          singleImage={true}
          withPreview={true}
          buttonStyles={{ backgroundColor: "#13aa52" }}
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
  categoryitem: PropTypes.object.isRequired,
};
