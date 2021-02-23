import React from 'react';
import './styles.css'
import Routes from './Routes';
import { ToastContainer } from 'react-toastify';


const App: React.FC = () => {
  return (

    <>
      <Routes />
      <ToastContainer
        position="top-center"
      />
    </>
  );
}

export default App;
