import React, {useState} from 'react';
import {AppBox, NavBox, NavButton} from './App.styled';
import {Global} from '@emotion/react';
import {GlobalStyles} from './Global.styled';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom'
import Garage from "./pages/Garage/Garage";
import Winners from "./pages/Winners/Winners";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import {Typography} from '@mui/material';


function App () {

  const [appTitle, setAppTitle] = useState ('Garage')

  return (
    <AppBox>
      <Global styles={GlobalStyles}/>
      <Router>
        <header>
          <NavBox>
            <NavLink to="/">
              <NavButton variant="contained" onClick={() => {
                setAppTitle ('Garage')
              }}>
                Garage
              </NavButton>
            </NavLink>
            <NavLink to="/winners">
              <NavButton variant="contained" onClick={() => {
                setAppTitle ('Winners')
              }}>
                Winners
              </NavButton>
            </NavLink>
            <Typography variant="h4">{appTitle}</Typography>
          </NavBox>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Garage/>}/>
            <Route path="/winners" element={<Winners/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </main>
      </Router>
    </AppBox>
  );
}

export default App;
