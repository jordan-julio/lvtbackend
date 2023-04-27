import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,  
} from '@mui/material';
import AppTopBar from '../components/TopNavBar';
import BackgroundContainer from '../components/BackgroundContainer';
import { useNavigate } from 'react-router-dom';
import { CloudUploadOutlined } from '@mui/icons-material';
import { Modal, Row, Upload } from 'antd';
import axios from 'axios';
import { localhost } from './JobsScreen';
import PopButton from '../components/AnimatedButton';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '100vw',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: '1rem',
    alignSelf: 'center',
  },
}));

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

function JobFormScreen() {
  const classes = useStyles();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [otherImgList, setOtherImgList] = useState([]);
  const [thumbnailImg, setThumbnailImg] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    address: '',
    clothing_type: 'Dress',
    thumbnail: '',
    images: '',
    description: '',
    budget: 0,
    postcode: '',
    state: '',
    user_id: -1,
  });

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (localStorage.getItem('token') !== null) {
      await axios.get(`${localhost}/user/id`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(async (res) => {
        setFormData({
          ...formData,
          user_id: res.data.user_id,
        });

        await axios.post(`${localhost}/jobs`, formData)
        .then((res) => {
          Modal.success({
            title: 'Job Posted Successfully',
            content: (
              <div>
                <p id='success'>Your job has been posted successfully!</p>
              </div>
            ),
            footer: [
              <Row key="row" flex="auto" justify="space-between">
                <PopButton key="submit" type="primary" onClick={() => {
                  setFormData({
                    first_name: '',
                    last_name: '',
                    phone_number: '',
                    email: '',
                    address: '',
                    clothing_type: 'Dress',
                    thumbnail: '',
                    images: '',
                    description: '',
                    budget: 0,
                    postcode: '',
                    state: '',
                    user_id: formData.user_id,
                  })
                  Modal.destroyAll();
                }
                }>
                  Ok
                </PopButton>
              </Row>
            ]
          })
        })
        .catch((err) => {
          Modal.error({
            title: 'Job Post Failed',
            content: (
              <div>
                <p id='error'>Your job has not been posted successfully!</p>
                <p id='error'>{err.response.data.message}</p>
              </div>
            ),
            footer: [
              <Row key="row" flex="auto" justify="space-between">
                <PopButton key="submit" type="primary" onClick={() => {
                  Modal.destroyAll();
                }
                }>
                  Ok
                </PopButton>
              </Row>
            ]
          })
        });
      }).catch((err) => { console.log(err); });
  } else {
    await axios.post(`${localhost}/jobs`, formData)
    .then((res) => {
      Modal.success({
        title: 'Job Posted Successfully',
        content: (
          <div>
            <p id='success'>Your job has been posted successfully!</p>
          </div>
        ),
        footer: [
          <Row key="row" flex="auto" justify="space-between">
            <PopButton key="submit" type="primary" onClick={() => {
              setFormData({
                first_name: '',
                last_name: '',
                phone_number: '',
                email: '',
                address: '',
                clothing_type: 'Dress',
                thumbnail: '',
                images: '',
                description: '',
                budget: 0,
                postcode: '',
                state: '',
                user_id: formData.user_id === -1 ? 0 : formData.user_id,
              })
              Modal.destroyAll();
            }
            }>
              Ok
            </PopButton>
          </Row>
        ]
      })
    })
      .catch((err) => {
        Modal.error({
          title: 'Job Post Failed',
          content: (
            <div>
              <p id='error'>Your job has not been posted successfully!</p>
              <p id='error'>{err.response.data.message}</p>
            </div>
          ),
          footer: [
            <Row key="row" flex="auto" justify="space-between">
              <PopButton key="submit" type="primary" onClick={() => {
                Modal.destroyAll();
              }
              }>
                Ok
              </PopButton>
            </Row>
          ]
        })
      });
    }
    
  };
  const navigate = useNavigate();

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = async ({ fileList: newFileList }) => {
    const newImages = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        return file.preview;
      })
    );
    setFormData((prevState) => ({
      ...prevState,
      images: newImages,
    }));
    setOtherImgList(newFileList);
  };

  const handleChangeThumbnail = async ({ fileList: newFileList }) => {
    const newImages = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        return file.preview;
      })
    );
    setFormData((prevState) => ({
      ...prevState,
      thumbnail: newImages,
    }));
    setThumbnailImg(newFileList);
  }

  const uploadButton = (
    <div>
      <CloudUploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
        <AppTopBar navigate={navigate} />
        <BackgroundContainer />
        <div style={{ 
            display:'flex',
            alignItems: 'center',
            backgroundColor: '#e3e3e3',
            borderRadius: '20px',
            margin: '10px',
            padding: '10px',
            width: '70vw',
            position:'sticky',
            left:'13%',
            flexDirection: 'column'
        }}>
        <h1>Post a Job</h1>
        <form className={classes.form} onSubmit={handleSubmit} id='jobForm'>
        <TextField 
            name="first_name"
            label="First Name"
            required 
            value={formData.first_name} 
            onChange={handleInputChange}
            style={{ width: '30vw' }}
        />
        <TextField 
            name="last_name"
            label="Last Name"
            required 
            value={formData.last_name} 
            onChange={handleInputChange} 
            style={{ width: '30vw' }}
        />
        <TextField 
            name="phone_number"
            label="Phone Number"
            required 
            value={formData.phone_number} 
            onChange={handleInputChange} 
            style={{ width: '30vw' }}
        />
        <TextField 
            name="email"
            label="Email Address"
            type="email"
            required 
            value={formData.email} 
            onChange={handleInputChange} 
            style={{ width: '30vw' }}
        />
        <TextField 
            name="address"
            label="Address"
            required 
            value={formData.address} 
            onChange={handleInputChange} 
            style={{ width: '30vw' }}   
        />
        <TextField 
            name="postcode"
            label="Postcode"
            required 
            value={formData.postcode} 
            onChange={handleInputChange} 
            style={{ width: '30vw' }}   
        />
        <TextField 
            name="state"
            label="State"
            required 
            value={formData.state} 
            onChange={handleInputChange} 
            style={{ width: '30vw' }}   
        />
        <FormControl style={{ width: '30vw' }}>
            <InputLabel>Clothing Types</InputLabel>
            <Select
              name="clothing_type"
              onChange={handleInputChange}
              multiple={false} // Set multiple prop to false
              defaultValue='Dress'
            >
            <MenuItem value="Dress">Dress</MenuItem>
            <MenuItem value="Ethnic Wear - Sari / Blouse">Ethnic Wear - Sari / Blouse</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
            </Select>
        </FormControl>
        <>
          <label htmlFor="thumbnailImg">Thumbnail Image</label>
          <div style={{ 
            maxWidth: '400px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center' }}>
          <Upload
            id="thumbnailImg"
            listType="picture-card"
            fileList={thumbnailImg}
            onPreview={handlePreview}
            onChange={handleChangeThumbnail}
            beforeUpload={()=> {
              return false; 
            }}
          >
          {thumbnailImg.length >= 1 ? null : uploadButton}
          </Upload>
          </div>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </>
          <label htmlFor="thumbnailImg">Other Images</label>
          <div style={{ maxWidth:'400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Upload
              id="thumbnailImg"
              listType="picture-card"
              fileList={otherImgList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => {
                return false;
              }}
            >
              {otherImgList.length >= 1 ? null : uploadButton}
            </Upload>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
          </div>
        <TextField 
            name="description"
            label="Description of Making"
            multiline
            rows={4}
            required 
            value={formData.description} 
            onChange={handleInputChange} 
            style={{ width: '30vw' }}
        />
        <TextField 
            name="budget"
            label="Budget (optional)"
            value={formData.budget} 
            onChange={handleInputChange}
            style={{ width: '30vw' }}
        />
        <PopButton htmlType='submit' sx={{ width: '30vw'}}>Submit</PopButton>
        </form>
        </div>
    </div>
  );
};

export default JobFormScreen;
