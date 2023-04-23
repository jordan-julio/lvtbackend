import styled from '@mui/material/styles/styled';
import { Button } from 'antd';

const PopButton = styled(Button)({
  '--bg': '#212121',
  '--hover-bg': '#5f5dbe',
  '--hover-text': '#313131',
  color: '#fff',
  border: '2px solid var(--bg)',
  borderRadius: 10,
  padding: '0.8em 2em',
  background: 'var(--bg)',
  transition: '0.4s',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '10px',

  '&:hover': {
    color: 'var(--hover-text) !important',
    transform: 'translate(-0.4rem,-0.4rem)',
    background: '#e3e3e3 !important',
    boxShadow: '0.4rem 0.3rem var(--hover-bg)',
  },

  '&:active': {
    transform: 'translate(0)',
    boxShadow: 'none',
  },
});

export default PopButton;
