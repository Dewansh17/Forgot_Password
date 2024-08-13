import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Auth from './Component/Auth'

function Allroutes({slidein,handleslidein}) {
  return (
    <Routes>
        <Route path='/Auth' element={<Auth/>}/>
    </Routes>
  )
}

export default Allroutes
