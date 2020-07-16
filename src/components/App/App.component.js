import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import AppContext from './App.context';
import theme from './App.theme';
import Login from '../Login';
import Home from '../Home';

function App() {
  const [appData, setAppData] = useState({
    isLoading: false,
    user: {},
    userToken: null
  });

  const startLoading = () => {
    updateAppData({ isLoading: true });
  };

  const finishLoading = () => {
    updateAppData({ isLoading: false });
  };

  const setUser = (user) => {
    updateAppData({ user });
  }

  const setUserToken = (userToken) => {
    updateAppData({ userToken });
  }

  const updateAppData = (data) => {
    setAppData({
      ...appData,
      ...data,
    });
  };

  const providerData = React.useMemo(
    () => ({
      ...appData,
      startLoading,
      finishLoading,
      setUser,
      setUserToken,
      updateAppData,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appData]
  );

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <AppContext.Provider value={providerData}>
          <div className="App SNApp SNApp__Container">
            {appData.isLoading && (
              <div>
                <LinearProgress color="primary" />
              </div>
            )}

            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/home/:userId?" component={Home} />
              <Redirect from="*" to="/login" />
            </Switch>
          </div>
        </AppContext.Provider>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;