import React, { useContext } from 'react';
import Login from './Login.component';
import { useSnackbar } from 'notistack';
import API from './../../api/Api';
import AppContext from './../App/App.context';

const LoginContainer = (props) => {
  const appContext = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const onLogin = async (formData) => {
    appContext.startLoading();

    try {
      let validUser = await API.login(
        formData.user,
        formData.password
      );

      if (validUser) {
        appContext.updateAppData({ user: validUser.user, userToken: validUser.token });
        props.history.push('/home');
      }
    } catch (e) {
      enqueueSnackbar('Usuario y/o contraseña incorrectos', { variant: 'error' });
    }

    appContext.finishLoading();
  };

  const onRegister = async (formData) => {
    appContext.startLoading();

    try {
      let successRegistered = await API.register(
        formData.newName,
        formData.newSurname,
        formData.newUser,
        formData.newPassword
      );

      if (successRegistered.user) {
        enqueueSnackbar('Usuario creado con éxito', { variant: 'success' });
        props.history.push('/home');
      }
    } catch (e) {
      enqueueSnackbar('Error al crear usuario', { variant: 'error' });
    }

    appContext.finishLoading();
  };

  return (
    <Login
      onLogin={onLogin}
      onRegister={onRegister}
      {...props}
    />
  );
};

export default LoginContainer;
