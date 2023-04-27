import React, { useState, useEffect } from 'react';
import { AppBar, Drawer, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Col, Modal, Row } from 'antd';
import PopButton from './AnimatedButton';
import MenuItems from './MenuItems';
import { handleMenuItemClick } from '../routes/WelcomeScreen';
import axios from 'axios';

function AppTopBar ({ navigate }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const isMobile = useMediaQuery('(max-width: 920px)');
  const [isMaker, setIsMaker] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setIsMaker(false);
    } else {
      axios
        .get('https://morning-everglades-00990.herokuapp.com/usertype', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          if (response.data.type === 'Maker') {
            setIsMaker(true);
          }
        })
        .catch((error) => {
          Modal.error({
            content: 'An error has occurred. Please try again later.'
          });
        });
    }
  }, []);

  const handleLogout = async () => {
    if (!localStorage.getItem('token')) {
      window.location.reload();
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('token');
      Modal.success({
        content: 'You have successfully logged out.',
      });
      navigate('/login');
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const appBarStyle = {
    backgroundColor: '#4d4d4d',
    borderRadius: '20px',
    maxWidth: '80%',
    top: '0',
    left: '10%',
    opacity: opacity,
    marginBottom: '10px',
  };
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const opacityValue = 1 - (scrollTop / 100); // Change the value as needed
    setOpacity(opacityValue <= 0 ? 0 : opacityValue);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <AppBar position="sticky" sx={appBarStyle}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Row>
          {!isMobile &&
          MenuItems().map((menuItem) => {
            if (!localStorage.getItem('token') && (menuItem.key === 3 || menuItem.key === 4)) {
              return null;
            }
            if (localStorage.getItem('token') && menuItem.key === 2) return null;
            if (!isMaker && menuItem.onlyMaker === true) {
              return null;
            } else if (isMaker && menuItem.onlyConsumer === true) {
              return null;
            }
            return (
              <PopButton
                key={menuItem.key}
                onClick={() => handleMenuItemClick(menuItem.path, navigate)}
                sx={{
                  marginRight: '10px'
                }}
              >
                <span style={{ marginRight: '10px' }}>{menuItem.icon}</span>
                {menuItem.label}
              </PopButton>
            );
            })}
        </Row>
        <Row>
          {isMobile ? (
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              color="inherit"
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <PopButton sx={{ marginRight: '10px' }} onClick={() => handleMenuItemClick('/signup', navigate)}>Sign Up</PopButton>
              {localStorage.getItem('token') ?
                (<PopButton onClick={() => {
                  handleLogout();
                }}>Logout</PopButton>) :
                (<PopButton onClick={() => handleMenuItemClick('/login', navigate)}>Log In</PopButton>)}
            </>
          )}
        </Row>
      </Toolbar>
      {isMobile && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
        >
          <Col style={{ marginLeft: '10px' }}>
          {MenuItems().map((menuItem) => {
            if (!localStorage.getItem('token') && (menuItem.key === 3 || menuItem.key === 4)) {
              return null;
            }
            if (localStorage.getItem('token') && menuItem.key === 2) return null;
            if (!isMaker && menuItem.onlyMaker === true) {
              return null;
            } else if (isMaker && menuItem.onlyConsumer === true) {
              return null;
            }
            return (
              <PopButton
                key={menuItem.key}
                onClick={() => handleMenuItemClick(menuItem.path, navigate)}
                sx={{
                  marginRight: '10px'
                }}
              >
                <span style={{ marginRight: '10px' }}>{menuItem.icon}</span>
                {menuItem.label}
              </PopButton>
            );
            })}
            <PopButton sx={{ marginRight: '10px' }} onClick={() => handleMenuItemClick('/signup', navigate)}>Sign Up</PopButton>
            {localStorage.getItem('token') ?
            (<PopButton onClick={() => {
              handleLogout();
            }}>Logout</PopButton>) :
            (<PopButton onClick={() => handleMenuItemClick('/login', navigate)}>Log In</PopButton>)}
          </Col>
        </Drawer>
      )}
    </AppBar>
  );
}

export default AppTopBar;
