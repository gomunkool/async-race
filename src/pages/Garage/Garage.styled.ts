import {styled} from '@mui/material/styles';
import {Box, Button} from '@mui/material';

export const GarageBox = styled (Box) (({}) => ({
  padding: '30px 0',
}));


export const InputBox = styled (Box) (({}) => ({
  width: '500px',
  high: '50px',
  display: 'flex',
  justifyContent: 'space-between'
}));

export const FormButton = styled (Button) (({}) => ({
  width: '200px',
}));

export const CarsConrtolBox = styled (Box) (({}) => ({
  marginTop: '30px',
  width: '500px',
  display: 'flex',
  justifyContent: 'space-between'
}));

export const CarsConrtolButton = styled (Button) (({}) => ({
  width: '150px',
}));


export const GarageControlBox = styled (Box) (({}) => ({
  width: '1200px',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px'
}));

export const PaginationButtonBox = styled (Box) (({}) => ({
  width: '400px',
  display: 'flex',
  justifyContent: 'space-between',
}));

export const PaginationButton = styled (Button) (({}) => ({
  width: '50px',
  marginRight: '10px'
}));
