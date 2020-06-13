import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './MainRouter';
import './styling/app.scss';


// The MainRouter is wrapped within the BrowserRouter letting us switch between components without having to reload/refresh the browser.
const App = () => (
  <BrowserRouter>
    <MainRouter />
  </BrowserRouter>
)

export default App;
