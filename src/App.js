import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import CompanySearch from './CompanySearch';
import rows from './Companies'
import townHalls from './TownHallEvents'
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/react-add-to-calendar/dist/react-add-to-calendar.css";


function App() {
  
  return (
    <div className="App">
      <CompanySearch rows={rows} townHalls={townHalls} />
    </div>
  );
}

export default App;

