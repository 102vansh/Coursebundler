import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './component/Home'
import Header from './component/layout/Header'
import Courses from './component/courses/Courses'
import Footer from './component/layout/Footer'
import Login from './component/Auth/Login'
import Register from './component/Auth/Register'
import Forgetpassword from './component/Auth/Forgetpassword'
import Resetpassword from './component/Auth/Resetpassword'
import Contact from './component/contact/Contact'
import Request from './component/request/Request'
import About from './component/about/About'
import Subscribe from './component/subscribe/Subscribe'
import Notfound from './component/subscribe/Notfound'
import { Paymentsucc } from './component/subscribe/Paymentsucc'
import Paymentfail  from './component/subscribe/Paymentfail'
import Coursepage from './component/coursedetail/Coursepage'
import Profile from './component/profile/Profile'
import UpdateProfile from './component/profile/UpdateProfile'
import Changepassword from './component/profile/Changepassword'
import Dashboard from './component/admin/Dashboard'
import Createcourse from './component/admin/Createcourse'
import AdminCourses from './component/admin/AdminCourses'
import Users from './component/admin/Users'
import {Toaster} from 'react-hot-toast'
import CodeEditor from './component/codeedior/CodeEditor'
import MockInterview from './component/interview/MockInterview'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getmyprofile } from './redux/actions/user'
import {ProtectedRoute} from 'protected-route-react'
import Loader from './component/layout/Loader'
import QuizApp from './component/quiz/QuizApp'
const App = () => {
  const dispatch = useDispatch()
  window.addEventListener('contextmenu', e => e.preventDefault())
  const {isAuthenticated,user,loading} = useSelector(state => state.user)
  useEffect(()=>{
    dispatch(getmyprofile())
  },[dispatch])
  
  return (
    <BrowserRouter>
    {/* {loading ? (<Loader/>):( */}
      
      <>
      <Header user={user} isAuthenticated={isAuthenticated}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/courses' element= {<Courses/>}/>
        <Route path='/course/:id' element={<ProtectedRoute isAuthenticated = {isAuthenticated}><Coursepage user={user}/></ProtectedRoute>}/>
        <Route path='/profile' element={<ProtectedRoute isAuthenticated = {isAuthenticated}><Profile user={user}/></ProtectedRoute>}/>
        <Route path='/updateprofile' element={<ProtectedRoute isAuthenticated = {isAuthenticated}><UpdateProfile/></ProtectedRoute>}/>
        <Route path='/changepassword' element={<ProtectedRoute isAuthenticated = {isAuthenticated}><Changepassword/></ProtectedRoute>}/>
        <Route path='/login' element={<ProtectedRoute isAuthenticated = {!isAuthenticated} redirect='/profile'><Login/></ProtectedRoute>}/>
        <Route path='/register' element={<ProtectedRoute isAuthenticated = {!isAuthenticated} redirect='/login'><Register/></ProtectedRoute>}/>
        <Route path='/forgotpassword' element={<ProtectedRoute isAuthenticated = {!isAuthenticated} redirect='/profile'><Forgetpassword/></ProtectedRoute>}/>
        <Route path='/resetpassword/:token' element={<ProtectedRoute isAuthenticated = {!isAuthenticated} redirect='/profile'><Resetpassword/></ProtectedRoute>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/request' element={<Request/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/subscribe' element={<ProtectedRoute isAuthenticated = {isAuthenticated}><Subscribe user = {user}/></ProtectedRoute>}/>
        <Route path='*' element={<Notfound/>}/>
        <Route path = '/paymentsuccess' element={<Paymentsucc/>}/>
        <Route path='/payfail' element={<Paymentfail/>}/>
        <Route path='/quiz' element={<QuizApp/>}/>
        <Route path='/codeeditor' element={<CodeEditor/>}/>
        <Route path='/mockint' element={<MockInterview/>}/>
        <Route path='/admin/dashboard' element={<ProtectedRoute isAuthenticated = {isAuthenticated} adminRoute = {true} isAdmin={user && user.role === 'admin'}><Dashboard/></ProtectedRoute>}/>
        <Route path='/admin/createcourses' element={<ProtectedRoute isAuthenticated = {isAuthenticated} adminRoute = {true} isAdmin={user && user.role === 'admin'}><Createcourse/></ProtectedRoute>}/>
        <Route path='/admin/courses' element={<ProtectedRoute isAuthenticated = {isAuthenticated} adminRoute = {true} isAdmin={user && user.role === 'admin'}><AdminCourses/></ProtectedRoute>}></Route>
        <Route path='/admin/users' element={<ProtectedRoute isAuthenticated = {isAuthenticated} adminRoute = {true} isAdmin={user && user.role === 'admin'}><Users/></ProtectedRoute>}></Route>
      </Routes>
      <Footer/>
      <Toaster/>
    </>
    {/* )} */}
    
    </BrowserRouter>
  )
}

export default App


