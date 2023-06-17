import {styled} from '@mui/material/styles';
import {Box, Button, Typography} from '@mui/material';

export const CarBox = styled (Box) (({}) => ({
  marginTop: '20px',
  position: 'relative'
}));

export const CarControlButton = styled (Button) (({}) => ({
  marginRight: '20px'
}));

export const CarNameTypography = styled (Typography) (({}) => ({
  display: 'inline-block',
  fontWeight: 'bold',
  fontSize: '18px'
}));

export const RaceBox = styled (Box) (({}) => ({
  borderBottom: '2px #000 dashed',
  marginTop: '20px',
  display: 'flex'
}));
export const RaceButtonBox = styled (Box) (({}) => ({
  // display:'flex'
}));

export const RaceButton = styled (Button) (({}) => ({
  display: 'block',
  marginBottom: '5px',
  width: '70px',
  marginRight: '15px'
}));

export const FinishLine = styled (Box) (({}) => ({
  width: '4px',
  height: '135px',
  position: 'absolute',
  right: '120px',
  top: '0px',
  borderLeft: '2px #000 dashed',
  borderRight: '2px #000 dashed',
  borderTop: '20px red solid',
}));

export const UpdateModalBox = styled (Box) (({}) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  backgroundColor: '#fff',
  border: '2px solid #000',
  boxShadow: '24',
  padding: '50px',
}));

export const UpdateModalButton = styled (Button) (({}) => ({
  display: 'block',
  marginTop: '20px'
}));