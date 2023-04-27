import React, { useState, useEffect } from "react";
import BackgroundContainer from "../components/BackgroundContainer";
import AppTopBar from "../components/TopNavBar";
import { useNavigate } from "react-router-dom";
import CardAnimate from "../components/AnimatedCard";
import axios from "axios";
import { Modal } from "antd";

export const handleMenuItemClick = (path, navigate) => {
    // logout, remove token
    navigate(path);
};

function WelcomeScreen () {
    const navigate = useNavigate();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    const [isMaker, setIsMaker] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem('token')) {
        setIsMaker(false);
        } else {
        axios.get('http://morning-everglades-00990.herokuapp.com/usertype', {
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

    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    const isMobile = screenWidth <= 900;

    return (
        <div>
            <BackgroundContainer></BackgroundContainer>
            <AppTopBar navigate={navigate} />
                <div>
                <CardAnimate style={{
                    width: '200px',
                    height: '100px',
                    display: 'flex',
                    top: '10%',
                    left: '10vw',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#212121',
                }}>
                    <h4 style={{ color: '#e3e3e3' }}>Welcome {localStorage.getItem('user') ? localStorage.getItem('user') : 'Guest'}</h4>
                </CardAnimate>
                </div>
            <div style={{ 
                display: 'flex',
                justifyContent: 'space-evenly', 
                alignItems: 'center',
                height: isMobile ? '100%' : '80vh',
                flexDirection: isMobile ? 'column' : 'row',
            }}>
                {isMaker ? (
                <CardAnimate sx={{ 
                    backgroundImage: 'url("https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80")',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    marginBottom: isMobile ? '20px' : '0px',
                    marginTop: isMobile ? '20px' : '0px',
                }}
                onClick={() => handleMenuItemClick('/jobs', navigate)}
                >
                    <div className="cardAnimate-content">
                        <span>Available Jobs</span>
                        <p>View Available Jobs Here!</p>
                    </div>
                </CardAnimate>) : (
                    null
                )}
                <CardAnimate sx={{ 
                    backgroundImage: 'url("https://images.unsplash.com/photo-1598554889165-8139a49f2883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80")',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    marginBottom: isMobile ? '20px' : '0px',
                }}
                onClick={() => handleMenuItemClick('/jobform', navigate)}
                >
                    <div className="cardAnimate-content">
                        <span>Post Job</span>
                        <p>Post A Job Here!</p>
                    </div>
                </CardAnimate>
                <CardAnimate sx={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1550686041-366ad85a1355?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80")',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    marginBottom: isMobile ? '20px' : '0px',
                }}
                onClick={() => handleMenuItemClick('/', navigate)}
                >
                    <div className="cardAnimate-content">
                        <span>Other</span>
                        <p>Other Description</p>
                    </div>
                </CardAnimate>
            </div>
        </div>
    )
}

export default WelcomeScreen;
