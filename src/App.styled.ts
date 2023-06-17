import {styled} from '@mui/material/styles';
import {Box, Button} from '@mui/material';

export const AppBox = styled (Box) (({}) => ({
  padding: '20px',
}));

export const NavBox = styled (Box) (({}) => ({
  display: 'flex',
}));

export const NavButton = styled (Button) (({}) => ({
  width: '150px',
  marginRight: '20px'
}));

