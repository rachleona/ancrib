// react and router dom
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import useWindowDimensions from './utils/windowDimensions'
 
import Home from './components/pages/Home'
import SideMenu from './components/layout/SideMenu'
import TopBar from './components/layout/TopBar'
import Standard from './components/pages/Standard'
import Custom from './components/pages/Custom'
import NotFound from './components/pages/NotFound'
import Footer from './components/layout/Footer'
import InfoBar from './components/layout/InfoBar'

const App= () => {
  const [ side, setSide ] = useState(true)
  const { width } = useWindowDimensions()

  const [ info, setInfo ] = useState(false)

  const algos = {
    "caesar": "Caesar Cipher", 
    "columnar": "Columnar Transposition", 
    "vigenere": "Vigenére Cipher", 
    "vernam": "Vernam Cipher", 
    "enigma": "Enigma", 
    "lucifer": "DES / 3DES", 
    "rijndael": "AES (Rijndael)", 
    "md5": "MD5", 
    "sha2": "SHA-256"
  }

  return (
    <Router>
      <div className="section">
        <SideMenu open={ side } setSide={ setSide } algos={ algos } />
        <div className="container" style={ side && width > 767 ? { marginLeft: `320px` } : {} }>
          <TopBar setSide={ setSide } side={ side } setInfo={ setInfo } />
          <div className="main">
            <div className="line"></div>
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route exact path="/cipher/:name" component={ Standard } />
              <Route exact path="/custom" component={ Custom } />
              <Route component={ NotFound } />
            </Switch>
          </div>
        </div>
        <InfoBar open={ info } setInfo={ setInfo } algos={ algos } />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
