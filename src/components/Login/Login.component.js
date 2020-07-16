import React, { useState } from 'react';
import { Button, TextField, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Login.css';

const Login = ({ onLogin, onRegister }) => {
  const [loginActived, setLoginActived] = useState(true);
  const [formData, setFormData] = useState({
    user: 'mp@hotmail.com',
    password: '123',
    newUser: '',
    newPassword: '',
    newConfirmPassword: '',
    newName: '',
    newSurname: '',
  });

  const onFormChange = (property) => ({ target: { value } }) => {
    const newFormData = {
      ...formData,
      [property]: value,
    };
    setFormData(newFormData);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (loginActived) {
      onLogin(formData);
    } else {
      onRegister(formData);
    }
  };

  const switchView = () => {
    setLoginActived(!loginActived);
  }

  return (
    <div className="Login Login__Container">

      {loginActived &&
        <div className="Login__Content">
          <div className="LoginForm__Form">
            <form onSubmit={onFormSubmit}>
              <TextField
                className="LoginForm__Form__TextField"
                label="Usuario"
                value={formData.user}
                onChange={onFormChange('user')}
              />

              <TextField
                className="LoginForm__Form__TextField"
                label="Contraseña"
                type="password"
                value={formData.password}
                onChange={onFormChange('password')}
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                className="LoginForm__Form__Button"
                disabled={!formData.user || !formData.password}
              >
                Ingresar
            </Button>

              <span className="LoginForm__Form__Button--register" onClick={switchView}>Me gustaría registrarme</span>
            </form>
          </div>
        </div>
      }

      <Box bgcolor="primary.main" className={classnames('Mask__Content', {
        'Mask__Content--left': !loginActived,
        'Mask__Content--right': loginActived,
      })}>
        my flora
      </Box>

      {!loginActived &&
        <div className="Register__Content">
          <div className="RegisterForm__Form">
            <form onSubmit={onFormSubmit}>
              <TextField
                className="RegisterForm__Form__TextField"
                label="Nombre"
                value={formData.newName}
                onChange={onFormChange('newName')}
              />

              <TextField
                className="RegisterForm__Form__TextField"
                label="Apellido"
                value={formData.newSurname}
                onChange={onFormChange('newSurname')}
              />

              <TextField
                className="RegisterForm__Form__TextField"
                label="Correo electrónico"
                value={formData.newUser}
                onChange={onFormChange('newUser')}
              />

              <TextField
                className="RegisterForm__Form__TextField"
                label="Contraseña"
                type="password"
                value={formData.newPassword}
                onChange={onFormChange('newPassword')}
              />

              <TextField
                className="RegisterForm__Form__TextField"
                label="Confirmar contraseña"
                type="password"
                value={formData.newConfirmPassword}
                onChange={onFormChange('newConfirmPassword')}
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                className="RegisterForm__Form__Button"
                disabled={!formData.newName || !formData.newSurname || !formData.newUser || !formData.newPassword || !formData.newConfirmPassword || formData.newPassword !== formData.newConfirmPassword}
              >
                Registrar
            </Button>

              <span className="RegisterForm__Form__Button--login" onClick={switchView}>Ya tengo cuenta</span>
            </form>
          </div>
        </div>
      }
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default Login;
