import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import CompanySearch from './CompanySearch';
import rows from './Companies'
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <div className="App">

      <CompanySearch rows={rows} />
    </div>
  );
}

export default App;

