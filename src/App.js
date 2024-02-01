import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUp from "./components/SignUp";
import { useState ,useEffect } from 'react';
import Home from './components/Home'
import Match from './components/Match';
import Bot from './components/Bot'

function App() {
  // ############################ SIGN / LOGIN INFO CODE ###########################

  const [propValue,setPropValue] = useState({heading:'Sign Up',midHeading:'Username',warning:'Username must be unique',buttonText:'Enter',placeHolder:'Enter Username 2-15'})
  const propUpdater = (newPropArray)=>{
    setPropValue(newPropArray)
  }

  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<SignUp heading = {propValue.heading} midHeading = {propValue.midHeading} warning = {propValue.warning} buttonText = {propValue.buttonText} placeHolder = {propValue.placeHolder} propUpdater = {propUpdater}/>} />

        <Route exact path = "/home" element = {<Home/>}/>
        <Route exact path = "/match" element = {<Match/>}/>
        <Route exact path = "/bot" element = {<Bot/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
