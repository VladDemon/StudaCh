import React from 'react'
import ReactDOM from 'react-dom/client'

import {createBrowserRouter,RouterProvider,} from "react-router-dom";

import Root from './pages/Root/Root';
import Profile from './pages/Profile/Profile';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Chat from './pages/Chat/Chat';
import Teaming from './pages/Teaming/Teaming';
import LoginPage from './components/SideMenu/LoginPage'
import RegistrationPage from './components/SideMenu/RegistrationPage';
import Stream from './pages/Stream/Stream';
import GetUser from './pages/GetUser';
import './index.scss'


import { AuthProvider } from './components/SideMenu/Auth';
import GetLoginPass from './components/SideMenu/GetLoginPass';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,

    children: [
      {
        path: "pages/Studies",
        element: <Profile/>,
      },
      {
        path: "pages/Chat",
        element: <Chat/>
      },
      {
        path: "pages/Teaming",
        element: <Teaming/>
      },
      {
        path: 'sign/login-in',
        element:<LoginPage/>
      },
      {
        path: "sign/login-up",
        element:<RegistrationPage/>
      },
      {
        path: "pages/stream",
        element: <Stream/>
      },
      {
        path: "pages/Users",
        element: <GetUser/>
      }
    ]
    
  },
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GetLoginPass>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>  
      </AuthProvider>
    </GetLoginPass>
  </React.StrictMode>,
)
