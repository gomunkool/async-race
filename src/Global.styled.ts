import { css } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { Container, Box } from '@mui/material';

export const GlobalStyles = css`
  * {
    margin: 0;
    border: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  body {
    width: 100%;
    height: inherit;
    margin: 0 auto;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  a:hover {
    cursor: pointer;
  }
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }
`;

export const ContainerCustom = styled(Container)(() => ({
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

export const PageContentWrap = styled(Box)(({ theme }) => ({
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  height: '100%',

  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
  },
}));
