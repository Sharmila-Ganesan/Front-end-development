import React from 'react';
import Routes from './router';
import './sass/App.scss';

import {  ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class App extends React.Component {
  componentDidMount(){
    if(document.getElementById('pageload')){
      document.getElementById('pageload').remove();
    }
    
  }
  render(){
    return(
      <div className="app">
        <ToastContainer  autoClose={3000} />
          <Routes /> 
          <div id="recaptcha-container"></div>
      </div>
    )
  }

}

export default App;
