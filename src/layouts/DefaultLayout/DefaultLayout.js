import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Drawer, List, ListItem, ListItemText, IconButton, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import AppContext from './../../components/App/App.context';
import API from './../../api/Api';

import './DefaultLayout.css';

const DefaultLayout = ({ children, history }) => {
  const appContext = useContext(AppContext);
  let user = appContext.user;
  const [drawerActived, setDrawerActived] = useState(false);
  const [follows, setFollows] = useState({
    following: [],
    followed: [],
  });
  const [users, setUsers] = useState([]);

  const switchDrawer = () => {
    setDrawerActived(!drawerActived);
  };

  const getFollows = async () => {
    appContext.startLoading();

    let token = appContext.userToken;
    if (token) {
      try {
        let newFollows = follows;

        let following = await API.getFollowing(appContext.userToken);
        let followed = await API.getFollowed(appContext.userToken);

        if (following && following.follows) {
          newFollows.following = following.follows;
        }

        if (followed && followed.follows) {
          newFollows.followed = followed.follows;
        }

        setFollows(newFollows);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('No posee token');
    }

    appContext.finishLoading();
  };

  const getUsers = async () => {
    appContext.startLoading();

    let token = appContext.userToken;
    if (token) {
      try {
        let response = await API.getUsers(appContext.userToken);

        if (response && response.users) {
          setUsers(response.users);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('No posee token');
    }

    appContext.finishLoading();
  };

  const openUser = (userId) => {
    switchDrawer();
    history.push(`/home/${userId}`);
  };

  useEffect(() => {
    getFollows();
    getUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="DefaultLayout DefaultLayout__Container">
      <Drawer anchor="left" open={drawerActived} className="Drawer">
        <div className="Drawer__Header">
          <IconButton onClick={switchDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Seguidores</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>

            <List className="Drawer__List">
              {!!follows.following.length && follows.following.map((follow, index) => (
                <ListItem button key={index}>
                  <ListItemText
                    primary={`${follow.followed.name} ${follow.followed.surname}`}
                    onClick={() => openUser(follow.followed._id)}
                  />
                </ListItem>
              ))}
              {!follows.following.length && (
                <ListItem button>
                  <ListItemText primary="No posees seguidores" />
                </ListItem>
              )}
            </List>

          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Siguiendo</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>

            <List className="Drawer__List">
              {!!follows.followed.length && follows.followed.map((follow, index) => (
                <ListItem button key={index}>
                  <ListItemText
                    primary={`${follow.user.name} ${follow.user.surname}`}
                    onClick={() => openUser(follow.user._id)}
                  />
                </ListItem>
              ))}
              {!follows.followed.length && (
                <ListItem button>
                  <ListItemText primary="No sigues a nadie" />
                </ListItem>
              )}
            </List>

          </ExpansionPanelDetails>
        </ExpansionPanel>

        <List className="Drawer__List">
          <ListItem button>
            <ListItemText primary={<strong>Usuarios</strong>} />
          </ListItem>
          {!!users.length && users.map((user, index) => (
            <ListItem button key={index}>
              <ListItemText
                primary={`${user.name} ${user.surname}`}
                onClick={() => openUser(user._id)}
              />
            </ListItem>
          ))}
          {!users.length && (
            <ListItem button>
              <ListItemText primary="No hay usuarios" />
            </ListItem>
          )}
        </List>
      </Drawer>

      {user.name &&
        <Box className="Navbar">
          <ChevronRightIcon onClick={switchDrawer} className="Navbar__IconDrawer" />
          Hola {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!

          <Box bgcolor="primary.main" className="User__Box">
            MP
          </Box>
        </Box>
      }
      <main>
        {children}
      </main>
    </div>
  )
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
