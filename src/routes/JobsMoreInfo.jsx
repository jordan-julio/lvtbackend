import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { localhost } from "./JobsScreen";
import BackgroundContainer from "../components/BackgroundContainer";
import AppTopBar from "../components/TopNavBar";
import { Carousel, Modal } from "antd";
import { TextField } from "@mui/material";
import PopButton from "../components/AnimatedButton";
import CardAnimate from "../components/AnimatedCard";
import styled from "@emotion/styled";

const CarouselWrapper = styled(Carousel)`
  > .slick-dots li button {
    width: 20px;
    background: rgb(88, 163, 163);
  }
  > .slick-dots li.slick-active button {
    background: #212121;
    width: 30px;
  }
`;


function JobsMoreInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const jobid = queryParams.get('jobid');
    const [images, setImages] = useState([]);
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({
        user_id: 0,
        job_id: jobid,
        price: 0,
        comments: '',
    });

    // Define state to store job details
    const [jobDetails, setJobDetails] = useState(null);
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    const [isMaker, setIsMaker] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem('token')) {
        setIsMaker(false);
        } else {
        axios
            .get('http://morning-everglades-00990.herokuapp.com/usertype', {
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
            console.log(error);
            });
        }
    }, []);
    
    useEffect(() => {
        const getJobDetails = async () => {
            try {
                const response = await axios.get(`${localhost}/jobs/${jobid}`);
                setJobDetails(response.data);
                const imagelist = [];
                imagelist.push(response.data.images.replace(/["]+/g, ''));
                imagelist.push(response.data.thumbnail.replace(/["]+/g, ''));
                setImages(imagelist);
            } catch (error) {
                console.error(error);
            }
        };
        getJobDetails();
    }, [jobid]);

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.get(`${localhost}/user/id`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include token in Authorization header
                }
            }).then((response) => {
                setFormData(
                    {
                        ...formData,
                        user_id: response.data.user_id,
                    }
                )
            }).catch((error) => {
                alert(error);
            });
            await axios.post(`${localhost}/jobs/quotations`, formData).then((response) => {
                Modal.success({
                    content: 'Your quotation has been submitted!',
                    onOk: () => {
                        axios.post(`${localhost}/jobs/sendquotations`, {
                            to: jobDetails.email,
                            subject: 'New Quotation',
                            text: `You have received a new quotation for your job ${jobDetails.clothing_type}!`,
                        })
                        .then((response) => {})
                        .catch((error) => {});
                        window.location.reload();
                    }
                })
            }).catch((error) => {
                Modal.error({
                    content: 'Your quotation failed to submit!',
                })
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                await axios.get(`${localhost}/jobs/${jobid}/quotations`)
                .then(async (response) => {
                    const commentlist = []
                    const axiosPromises = response.data.map(async (comment) => {
                        if (comment.user_id !== 0) {
                          // Fetch user data for comments with user_id other than 0
                          const userResponse = await axios.get(`${localhost}/users/${comment.user_id}`);
                          const newComment = {
                            username: userResponse.data.username,
                            price: comment.price,
                            comments: comment.comments,
                          };
                          commentlist.push(newComment);
                        } else {
                          const newComment = {
                            username: 'Anonymous',
                            price: comment.price,
                            comments: comment.comments,
                          };
                          commentlist.push(newComment);
                        }
                      });
                  
                      // Wait for all promises to resolve
                    await Promise.all(axiosPromises);
                    setComments(commentlist);
                }).catch((error) => {
                    throw error;
                })
            } catch (error) {
                console.error(error);
            }
        };
        getComments();
    }, [jobid]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'azure' }}>
            <AppTopBar navigate={navigate} />
            <BackgroundContainer></BackgroundContainer>
            {jobDetails ? (
                <div style={{ width: '70%', backgroundColor: '#aeaeba', padding: '50px', borderRadius: '20px' }}>
                    <CarouselWrapper autoplay swipe={true}>
                        {images.map((image, index) => (
                            <img key={index} src={image} alt="" />
                        ))}
                    </CarouselWrapper>
                    <h2>Job Type: {jobDetails.clothing_type}</h2>
                    <p>Location: {jobDetails.address}, {jobDetails.state} {jobDetails.postcode}</p>
                    <p>Phone No: {jobDetails.phone_number}</p>
                    <p>Email: {jobDetails.email}</p>
                    <p>Description: {jobDetails.description}</p>
                    <p>Budget: ${jobDetails.budget}</p>
                    <p>Created At: {jobDetails.created_at}</p>
                    <p>Status: {jobDetails.takenby ? 'Taken' : 'Available'}</p>
                    <h1>Quotation:</h1>
                    <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        {comments.length !== 0 ? (
                            comments.map((comment, index) => (
                                <CardAnimate key={index} style={{ 
                                    marginBottom: '10px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    padding: '20px',
                                    borderRadius: '40px',
                                    boxShadow: 'rgb(163, 163, 163) 20px 20px 40px, rgb(227, 226, 251) -13px -13px 26px',
                                    backgroundColor: '#e3e3e3',
                                    }}>
                                    <h2>User: {comment.username}</h2>
                                    <p>Price: {comment.price}</p>
                                    <p>Comment: {comment.comments}</p>
                                </CardAnimate>
                            ))) : (
                                <CardAnimate>
                                    <p>No quotation yet</p>
                                </CardAnimate>
                            )}
                    </div>
                    {isMaker ? (
                    <div style={{ marginTop: '20px' }}>
                        <form style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            backgroundColor: '#e3e3e3', 
                            borderRadius: '20px',
                            padding: '20px',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }} onSubmit={handleCommentSubmit} id='quotationForm'>
                            <h3>Add Quotation:</h3>
                            <TextField 
                                name="comments"
                                id="filled-multiline-static"
                                label="Comment"
                                required 
                                value={formData.comments} 
                                onChange={handleInputChange}
                                style={{ width: '30vw', marginBottom: '20px' }}
                                multiline
                                maxRows={4}

                            />
                            <TextField 
                                name="price"
                                label="Price"
                                required 
                                value={formData.price} 
                                onChange={handleInputChange} 
                                style={{ width: '30vw' }}
                            />
                            <PopButton htmlType="submit">Post Quotation</PopButton>
                        </form>
                    </div>) : (
                        <div></div>
                    )}
                </div>
            ) : (
                    <p>Loading job details...</p>
                )}
        </div>
    );
}
    
export default JobsMoreInfo;
