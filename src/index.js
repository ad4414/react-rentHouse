import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './pages/router';
import reducer from '../src/Store';
import { AliveScope } from 'react-activation'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <AliveScope>
   <Provider store={reducer}>

      <RouterProvider router={router}></RouterProvider>
     </Provider>
 </AliveScope>
    
  
);

 
