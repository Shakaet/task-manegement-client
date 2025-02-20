import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { ErrorPages } from './component/ErrorPages.jsx';
import { MainLayout } from './component/MainLayout.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './component/Home.jsx';
import { Login } from './component/Login.jsx';
import AuthProvider from './AuthProvider.jsx';
import PrivateRoute from './component/PrivateRoute.jsx';

import AddTask from './component/AddTask.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ManageTask from './component/ManageTask.jsx';
import { EditTask } from './component/EditTask.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<ErrorPages></ErrorPages>,
    element: <MainLayout></MainLayout>,
    children:[
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/managetask",
        element:<PrivateRoute><ManageTask></ManageTask></PrivateRoute>,
      },
      {
        path: "/addtask",
        element: <PrivateRoute><AddTask></AddTask></PrivateRoute>,
      },
      {
        path: "/edittask/:id",
        element: <PrivateRoute><EditTask></EditTask></PrivateRoute>,
      }
     
      
    
     
    ]
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  
  <QueryClientProvider client={queryClient}>
      <AuthProvider>   
<RouterProvider router={router} />
</AuthProvider>,
  </QueryClientProvider>
  
)
