import { useEffect } from 'react';
import { createRoutesFromElements, Route } from 'react-router'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom';
import NotFound from './components/notfound';
import { useGlobalContext } from './context/context'
import HomeLayout from './layouts/homeLayout';
import RootLayout from './layouts/RootLayout';
import AddContact from './pages/addContact';
import Home from './pages/home';
import Login from './pages/login'
import Register from './pages/register';
import PrivateRoute from './privateroutes/privateHome';
import ProtectedRoute from './privateroutes/protectedRoute';

function App() {
  const {isLogged} = useGlobalContext()
  useEffect(()=>{
   
      isLogged()
  },[])


 const router= createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>

        <Route  index  element={
         <ProtectedRoute>
          <Login/>
        </ProtectedRoute>}/>

        <Route  path='register' element={
         <ProtectedRoute>
          <Register/>
        </ProtectedRoute>}/>

        <Route  path='home' errorElement={<NotFound/>} element={<HomeLayout/>}>
          
              <Route index element={<PrivateRoute > <Home/> </PrivateRoute>   }/>
              <Route path='add' element={
               <PrivateRoute >
                   <AddContact/>
               </PrivateRoute> 
            } />
        </Route>
         
        <Route path='*' element={<NotFound/>}/>
      </Route>
    )
  );
  return (
    <>  
    <main>
    <RouterProvider router={router}/>
    </main>
    </>
  )
}

export default App
