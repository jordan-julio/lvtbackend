import { styled } from '@mui/material/styles';

export const CardAnimate = styled('div')({
  width: '270px',
  height: '350px',
  backgroundColor: 'rgb(255, 255, 255)',
  borderRadius: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #8f7eff, #44a4ff)',
    opacity: 0,
    transition: 'opacity 0.5s ease-in-out',
  },
  '&:hover:before': {
    opacity: 0.5,
  },
  '& .cardAnimate-content': {
    width: '170px',
    height: '200px',
    padding: '0 10px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -45%)',
    textAlign: 'center',
    color: 'rgb(0, 0, 0)',
    zIndex: 1,
    backgroundColor: '#e3e3e3',
    transition: 'all 0.3s ease-in-out',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: '20px',
    opacity: '0.78',
    '& span': {
      fontSize: '1.7rem',
      fontWeight: 700,
    },
  },
  '&:hover .cardAnimate-content': {
    transform: 'translate(-50%, -50%)',
    opacity: '1',
  },
});

export default CardAnimate;