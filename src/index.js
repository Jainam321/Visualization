import React from 'react';
import ReactDOM from 'react-dom';
import Matrix from './components/Matrix'
import Navbar from './components/Navbar';
import './index.css';

ReactDOM.render(
  <>
  <Navbar></Navbar>
  <Matrix/>
  </>,
  document.getElementById('root')
);

