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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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
    setPicture(picture[0]);
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
  const [menuitems, setMenuitems] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const fetchMenuItems = async () => {
    await http
      .get("/menuitems")
      .then(function (response) {
        setMenuitems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
    fetchMenuItems();
    fetchCategories();
  }, []);


  const handleSubmit = async (evt) => {
    let imgData = await toBase64(picture);
    evt.preventDefault();

    const menuitem = {
      categoryID: category,
      name: name,
      description: description,
      imageData: imgData,
      ingredients: ingredients,
      additive: additive,
      menuitemprice: menuitemprice
    };

    http
      .post("/menuitem", menuitem)
      .then(function () {
        console.log(menuitem);
        console.log("added");
        fetchMenuItems();
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
        <FormControl className="dropdown">
          <InputLabel htmlFor="categories-select">Kategorie</InputLabel>
          <Select
            labelId="open-select-label"
            id="open-select"
            onChange={handleChange}
            inputProps={{
              id: 'categories-select',
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
          margin="dense"
          id="description"
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
          margin="dense"
          id="ingredients"
          label="Ingredients"
          type="text"
          fullWidth
          onChange={(e) => setIngredients(e.target.value)}
        />
        <TextField
          required
          margin="dense"
          id="additive"
          label="Additive"
          type="text"
          fullWidth
          onChange={(e) => setAdditive(e.target.value)}
        />
        <TextField
          required
          margin="dense"
          id="menuitemprice"
          label="Menuitemprice"
          type="number"
          step="0.01"
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
  const [menuitems, setMenuitems] = useState([]);

  const fetchMenuItems = async () => {
    await http
      .get("/menuitems")
      .then(function (response) {
        setMenuitems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function handleConfirm() {
    http
      .delete("/MENUITEM/" + id)
      .then(function () {
        console.log("deleted");
        fetchMenuItems();
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

export const EditDialog = ({ isOpen, menuitem, handleClose }) => {
  const [category, setCategory] = useState(menuitem.categoryID);
  const [name, setName] = useState(menuitem.name);
  const [description, setDescription] = useState(menuitem.description);
  const [picture, setPicture] = useState([]);
  const [image, setImage] = useState(menuitem.image);
  const [ingredients, setIngredients] = useState(menuitem.ingredients);
  const [additive, setAdditive] = useState(menuitem.additive);
  const [menuitemprice, setMenuitemprice] = useState(menuitem.menuitemprice);

  const onDrop = (picture) => {
    setPicture(picture[0]);
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

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

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  async function handleConfirm (evt) {
    evt.preventDefault();
    var menuitems = { 
      categoryID: category,
      name: name,
      description: description,
      ingredients: ingredients,
      additive: additive,
      menuitemprice: menuitemprice
    };
    if(picture !== null && !Array.isArray(picture)) {
      let imgData = await toBase64(picture);
      menuitems.imageData = imgData;
    }
    console.log("aaa", menuitems);

    // evt.preventDefault();
    if (menuitems !== "") {
      http
        .patch("/menuitem/" + menuitem._id, menuitems)
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
          "{menuitem.name}" bearbeiten.
        </DialogContentText>
        <FormControl className="dropdown">
          <InputLabel htmlFor="categories-select">Kategorie</InputLabel>
          <Select
            labelId="open-select-label"
            id="open-select"
            onChange={handleChange}
            inputProps={{
              id: 'categories-select',
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          defaultValue={menuitem.name}
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          margin="dense"
          id="description"
          label="Description"
          type="text"
          defaultValue={menuitem.description}
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
          margin="dense"
          id="ingredients"
          label="Ingredients"
          type="text"
          defaultValue={menuitem.ingredients}
          fullWidth
          onChange={(e) => setIngredients(e.target.value)}
        />
        <TextField
          required
          margin="dense"
          id="additive"
          label="Additive"
          type="text"
          defaultValue={menuitem.additive}
          fullWidth
          onChange={(e) => setAdditive(e.target.value)}
        />
        <TextField
          required
          margin="dense"
          id="menuitemprice"
          label="Menuitemprice"
          type="number"
          step="0.01"
          defaultValue={menuitem.menuitemprice}
          fullWidth
          onChange={(e) => setMenuitemprice(e.target.value)}
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
  menuitem: PropTypes.object.isRequired,
};