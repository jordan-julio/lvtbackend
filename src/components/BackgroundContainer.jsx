import styled from '@mui/material/styles/styled';

const BackgroundContainer = styled('div')({
  backgroundColor: '#fff',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  position: 'absolute',
  left: '0px',
  top: '0px',
  width: '100%',
  minHeight: '100%',
  backgroundAttachment: 'fixed',
  zIndex: '-1',
  opacity: '0.4',
});

export default BackgroundContainer;
