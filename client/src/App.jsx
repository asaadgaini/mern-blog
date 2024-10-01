import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import PrivateRoute from "./components/PrivateRoute"
import Projects from './pages/projects'

function App() {
   return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path='/' element={<Home/>}/>
          <Route path='/projects' element={<Projects/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>

        </Route>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
)}

export default App
