import { useState } from 'react'
import { createRoutesFromElements, Route } from 'react-router'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom';
import AppProvider from './context/context'
import RootLayout from './layouts/RootLayout';
import Home from './pages/home';
import Login from './pages/login'
import Register from './pages/register';
function App() {
 const router= createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home/>}/>
        <Route  path='login' element={<Login/>}/>
        <Route  path='register' element={<Register/>}/>
        
      </Route>
    )
  );
  return (
    <>
     <AppProvider>
        <RouterProvider router={router}/>
     </AppProvider>
    </>
  )
}

export default App
