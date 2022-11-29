import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../page/Home';
import Error404 from '../page/Error404';
import User from '../page/User/User';
import Users from '../page/Users';

export default function Routing(props) {
  const {setRefreshCheckLogin} = props;
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home setRefreshCheckLogin={setRefreshCheckLogin}/>}/>
          <Route path='*' element={<Error404/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/:id' element={<User/>}/>
        </Routes>
        
    </Router>
    )
}
