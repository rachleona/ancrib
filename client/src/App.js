// react and router dom
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import useWindowDimensions from './utils/windowDimensions';
 
import Home from './components/pages/Home'
import SideMenu from './components/layout/SideMenu'
import TopBar from './components/layout/TopBar'
import Standard from './components/pages/Standard'
import Custom from './components/pages/Custom'
import NotFound from './components/pages/NotFound';

const App= () => {
  const [ side, setSide ] = useState(true)
  const { width } = useWindowDimensions()

  return (
    <Router>
      <div className="section">
        <SideMenu open={ side } setSide={ setSide } />
        <div className="container" style={ side && width > 767 ? { marginLeft: `320px` } : {} }>
          <TopBar setSide={ setSide } side={ side }/>
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
      </div>
    </Router>
  );
}

export default App;
