import React, { useContext, useState, useEffect } from 'react';
import Home from './Home.component';
import { useSnackbar } from 'notistack';
import API from './../../api/Api';
import AppContext from './../App/App.context';

const HomeContainer = (props) => {
  const [publications, setPublications] = useState(null);
  const appContext = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const userId = props.match.params.userId;

  const getPublications = async () => {
    appContext.startLoading();

    let token = appContext.userToken;
    if (token) {
      try {

        let data = await API.getPublications(appContext.userToken, userId);

        if (data) {
          setPublications(data.publications);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      props.history.push('/login');
    }

    appContext.finishLoading();
  }

  const onFormSubmit = async (data) => {
    appContext.startLoading();

    let token = appContext.userToken;
    if (token) {
      try {
        let publicationSaved = await API.savePublication(data, token);

        if (publicationSaved) {
          enqueueSnackbar('Publicacióm exitosa', { variant: 'success' });
          getPublications();
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      props.history.push('/login');
    }

    appContext.finishLoading();
  }

  const deletePublication = async (publicationId) => {
    appContext.startLoading();

    let token = appContext.userToken;
    if (token) {
      try {
        await API.deletePublication(publicationId, token);

        enqueueSnackbar('Publicacióm eliminada con exito', { variant: 'success' });
        getPublications();
      } catch (e) {
        console.log(e);
      }
    } else {
      props.history.push('/login');
    }

    appContext.finishLoading();
  }

  useEffect(() => {
    getPublications();
    // eslint-disable-next-line
  }, [userId]);

  return (
    <Home
      publications={publications}
      onFormSubmit={onFormSubmit}
      deletePublication={deletePublication}
      {...props}
    />
  );
};

export default HomeContainer;
