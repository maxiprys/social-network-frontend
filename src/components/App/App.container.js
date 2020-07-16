import React from 'react';
import { SnackbarProvider } from 'notistack';
import App from './App.component';

const AppContainer = () => (
  <SnackbarProvider
    maxSnack={1}
  >
    <App />
  </SnackbarProvider>

);

export default AppContainer;
