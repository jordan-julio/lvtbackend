import React, { useEffect, useState } from "react";
import axios from 'axios';
import BackgroundContainer from "../components/BackgroundContainer";
import AppTopBar from "../components/TopNavBar";
import { useNavigate } from "react-router-dom";
import { FlipCard, FlipCardBack, FlipCardFront, FlipCardInner, Title } from "../components/FlipCard";
import PopButton from "../components/AnimatedButton";
import FormDiv from "../components/FormDiv";

export const localhost = 'http://127.0.0.1:3333';
function JobsScreen () {
    const [jobs, setJobs] = React.useState([]);
    const [isDataFetching, setIsDataFetching] = React.useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    const isMobile = screenWidth <= 900;

    const getJobs = async () => {
        const response = await axios.get(`${localhost}/jobs`,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token in Authorization header
            }
          });
        setJobs(response.data);
        setIsDataFetching(true);
    }
    if (isDataFetching === false) {
        getJobs();
    }
    const navigate = useNavigate();
    if (!localStorage.getItem('token')) {
        return (
        <div style={{ height: '100vh', paddingBottom: '20px' }}>
            <BackgroundContainer></BackgroundContainer>
            <AppTopBar navigate={navigate} />
            <div style={{
                marginLeft: '32px',
                width: '270px',
                height: '80px',
                borderRadius: '50px',
                background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
                boxShadow: '26px 26px 51px #a3a3a3, -26px -26px 51px #ffffff',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
            }}>
                <h1>Available Jobs</h1>
            </div>
            <FormDiv
                style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(1, minmax(300px, 1fr))' : 'repeat(3, minmax(300px, 1fr))',
                gap: '10px',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: '100%',
                padding: '10px',
                margin: '20px',
                }}
            >
                <div>Only Makers Can See Available Jobs!</div>
            </FormDiv>
            </div>
        )
    }
    return (
        <div style={{ height: '100vh', paddingBottom: '20px' }}>
            <BackgroundContainer></BackgroundContainer>
            <AppTopBar navigate={navigate} />
            <div style={{
                marginLeft: '32px',
                width: '270px',
                height: '80px',
                borderRadius: '50px',
                background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
                boxShadow: '26px 26px 51px #a3a3a3, -26px -26px 51px #ffffff',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
            }}>
                <h1>Available Jobs</h1>
            </div>
            <FormDiv
                style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(1, minmax(300px, 1fr))' : 'repeat(3, minmax(300px, 1fr))',
                gap: '10px',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: '100%',
                padding: '10px',
                margin: '20px',
                }}
            >
                {jobs.map((job) => (
                <FlipCard key={Math.random().toString()} className="FlipCard" sx={{ margin: '10px' }}>
                    <FlipCardInner className="FlipCardInner">
                    <FlipCardFront style={{ 
                        backgroundImage: `url(${job.thumbnail})`,
                        backgroundSize: 'cover',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <div style={{ 
                            backgroundColor: '#e3e3e3',
                            opacity: 0.9, 
                            width: '80%',
                            height: '60%',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Title sx={{ color: '#212121' }}>{job.clothing_type}</Title>
                        <p style={{ color: '#212121' }}>{job.description}</p>
                        <p style={{ color: '#212121' }}>Budget: ${job.budget.toFixed(2)}</p>
                        </div>
                    </FlipCardFront>
                    <FlipCardBack sx={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
                        <p>
                        Location: {job.address}, {job.state} {job.postcode}
                        </p>
                        <p>
                        Contact: {job.first_name} {job.last_name}
                        </p>
                        <p>Email: {job.email}</p>
                        <p>Phone: {job.phone_number}</p>
                        <PopButton sx={{ width: '20%' }} onClick={() => {
                            navigate(`/jobsinfo?jobid=${job.id}`);
                        }}>More Info</PopButton>
                    </FlipCardBack>
                    </FlipCardInner>
                </FlipCard>
                ))}
            </FormDiv>
        </div>
    )
}

export default JobsScreen;
