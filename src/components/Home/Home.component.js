import React, { useState, useContext } from 'react';
import { Typography, Paper, TextField, Button, Input, Box, Menu, MenuItem, IconButton } from '@material-ui/core';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import * as moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DefaultLayout from './../../layouts/DefaultLayout';
import AppContext from './../App/App.context';

import './Home.css';

const MenuOptions = ({ publicationId, deletePublication }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const onDeletePublication = (publicationId) => {
    handleCloseOptions();
    deletePublication(publicationId);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClickOptions}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseOptions}
      >
        <MenuItem onClick={() => onDeletePublication(publicationId)}>Eliminar</MenuItem>
      </Menu>
    </div>
  );
};

const Home = ({ publications, onFormSubmit, deletePublication, match, history }) => {
  const appContext = useContext(AppContext);
  const [formData, setFormData] = useState({
    text: '',
    image: '',
    previewImage: '',
  });

  const userId = match.params.userId;

  const onFormChange = (property, e) => {
    let newFormData = formData;

    if (property === 'image') {
      let value = e.target.files[0];
      if (value) {
        newFormData = {
          ...formData,
          [property]: value,
          previewImage: URL.createObjectURL(value),
        };
      }

    } else if (property === 'text') {
      newFormData = {
        ...formData,
        [property]: e.target.value,
      };
    }

    setFormData(newFormData);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    onFormSubmit(formData);
  };

  return (
    <DefaultLayout history={history}>
      <div className="Home Home__Container">
        <div className="Home__Content">

          {!userId &&
            <Paper className="Home__Content__Paper">
              <Typography color="primary" variant="h6">Publicá tu planta</Typography>

              <form onSubmit={onSubmit} className="Home__Form">
                <TextField
                  label="Nombre de la planta"
                  value={formData.text}
                  onChange={(e) => onFormChange('text', e)}
                />

                <TextField
                  label="Tiempo de vida"
                />

                {/* <TextField
                  label="Escriba aqui"
                  multiline
                  rows={2}
                  value={formData.text}
                  onChange={(e) => onFormChange('text', e)}
                /> */}

                <Box className="Home__Form__UploadBox">
                  <label htmlFor="image" className="Home__Form__UploadLabel">
                    {!formData.previewImage &&
                      <Box className="Home__Form__UploadImage">
                        +<LocalFloristIcon fontSize="large"/>
                      </Box>
                    }
                    {formData.previewImage &&
                      <img
                        src={formData.previewImage}
                        width="100px"
                        alt="upload of new publication"
                        className="Home__Form__UploadImage"
                      />
                    }
                  </label>
                  <Input
                    id="image"
                    className="Home__Form__UploadInput"
                    type="file"
                    value={formData.image.value}
                    onChange={(e) => onFormChange('image', e)}
                  />
                </Box>

                <div className="Home__Form__Button__Container">
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    className="Home__Form__Button"
                    disabled={!formData.text}
                  >
                    Publicar
              </Button>
                </div>
              </form>

            </Paper>
          }

          {publications && publications.map((publication, index) => (
            <Paper key={index} className="Home__Content__Paper">
              <Box className="Publication__Header">
                <Box className="Publication__Header--left">
                  {appContext.user._id === publication.user._id &&
                    <Typography color="primary" variant="body1">
                      Tú has publicado
                    </Typography>
                  }
                  {appContext.user._id !== publication.user._id &&
                    <Typography color="primary" variant="body1">
                      {publication.user.name} {publication.user.surname} ha publicado
                    </Typography>
                  }

                  <div className="Publication__Header--date">
                    {moment.unix(publication.created_at).format("DD-MM-YYYY, h:mm a")}
                  </div>
                </Box>

                <Box className="Publication__Header--right">
                  <MenuOptions
                    publicationId={publication._id}
                    deletePublication={deletePublication}
                  />
                </Box>
              </Box>

              <div className="Publication__Text">
                {publication.text}
              </div>

              {publication.file &&
                <img
                  src={`http://localhost:3800/publications/${publication.file}`}
                  className="Publication__Image"
                  alt="upload of publication"
                />
              }
            </Paper>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
