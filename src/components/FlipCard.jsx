import { styled } from '@mui/material/styles';

export const FlipCard = styled('div')({
    backgroundColor: 'transparent',
    width: '90%',
    height: '80%',
    perspective: '1000px',
    fontFamily: 'sans-serif',
    '&:hover > div:first-of-type': {
        transform: 'rotateY(180deg)',
    },
});

export const Title = styled('p')({
    fontSize: '1.5em',
    fontWeight: '900',
    textAlign: 'center',
    margin: '0',
});
  
export const FlipCardInner = styled('div')({
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
});
  
export const FlipCardFront = styled('div')({
    boxShadow: '0 8px 14px 0 rgba(0,0,0,0.2)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    WebkitBackfaceVisibility: 'visible',
    backfaceVisibility: 'visible',
    border: '1px solid coral',
    borderRadius: '1rem',
    background: 'linear-gradient(120deg, bisque 60%, rgb(255, 231, 222) 88%, rgb(255, 211, 195) 40%, rgba(255, 127, 80, 0.603) 48%)',
    color: 'coral',
    transform: 'rotateY(0deg)',
});
  
export const FlipCardBack = styled('div')({
    boxShadow: '0 8px 14px 0 rgba(0,0,0,0.2)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    border: '1px solid coral',
    borderRadius: '1rem',
    background: 'linear-gradient(120deg, rgb(255, 174, 145) 30%, coral 88%, bisque 40%, rgb(255, 185, 160) 78%)',
    color: 'white',
    transform: 'rotateY(180deg)',
});
