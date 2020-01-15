import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './pages/login'
import './App.css';
import 'antd/dist/antd.css'

function App() {
  return (
    <Router>
      <Route path="/login" component={Login} exact />
    </Router>
  );
}

export default App;
