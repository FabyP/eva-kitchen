import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import ImageUploader from "react-images-upload";

import http from "../../http-common";
import "./menu-dialogs.css";

export const AddDialog = ({ isOpen, handleClose }) => {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState([]);
    const [ingredients, setIngredients] = useState("");
    const [additive, setAdditive] = useState("");
    const [menuitemprice, setMenuitemprice] = useState("");

    const onDrop = (picture) => {
        setPicture([...picture, picture]);
      };

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        await http
          .get("/categories")
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

  
    const handleSubmit = (evt) => {
      evt.preventDefault();
  
    const menuitem = { 
        catgeory: category,
        name: name,
        description: description,
        image: picture,
        ingredients: ingredients,
        additive: additive,
        menuitemprice: menuitemprice
    };
  
      http
        .post("/MENUITEM/", menuitem)
        .then(function () {
            console.log(menuitem);
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
        <DialogTitle id="form-dialog-title">Speise hinzufügen</DialogTitle>
        <DialogContent>
          <DialogContentText>Bitte wählen sie eine passende Kategorie und füllen Sie die Felder aus.</DialogContentText>
          <Select
            labelId="open-select-label"
            id="open-select"
            onChange={(e) => setCategory(e.target.value._id)}
            >
            <MenuItem disabled value="">
                <em>Kategorie</em>
            </MenuItem>
            {categories.map((category) => ( 
                <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
            ))}
            </Select>
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
            <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
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
            <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Ingredients"
            type="text"
            fullWidth
            onChange={(e) => setIngredients(e.target.value)}
          />
            <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Additive"
            type="text"
            fullWidth
            onChange={(e) => setAdditive(e.target.value)}
          />
            <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Menuitemprice"
            type="text"
            fullWidth
            onChange={(e) => setMenuitemprice(e.target.value)}
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
      .delete("/MENUITEM/" + id)
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
