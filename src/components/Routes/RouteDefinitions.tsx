import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import UserInformation from '../../pages/UserInformation/UserInformation'
import Grades from '../../pages/Grades/Grades'

const RouteDefinitions = () => {
  return (
    <Routes>
      <Route path="/" element= {<Home />} />
      <Route path="/userInformation" element= {<UserInformation />} />
      <Route path="/grades" element={<Grades />} />
    </Routes>
  )
}

export default RouteDefinitions