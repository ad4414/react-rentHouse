import {createHashRouter } from "react-router-dom";
 import Home from "../Home";
import CityList from "../CityList";
import Layout from "../Layout";
import News from "../News";
import Mine from "../Mine";
import Searchpage from "../Home/Search/search";
import Maps from "../Home/Map";
import Login from "../Login/login";
import SearchHouse from "../FindHouse/searchHouse";
import FindHouse from "../FindHouse/index.js";
import { Suspense, lazy } from "react";
import { Spin } from "antd";
import KeepAlive from "react-activation";
const HouseDetail=lazy(()=>import('../FindHouse/houseDetail.js'))
const router=createHashRouter([
    {
        path:'/login',
        element: <Login/> 
    },
    {
        path:'/',
        element:  <Layout/>,
        children:[{
            path:'/news',
            element:<KeepAlive cacheKey="2"><News/></KeepAlive>
        },
         {
        path:'/home',
        element: <Home/> 
    },
    {
        path:'/findHouse',
        element:  <FindHouse/>  ,
    },{
        path:'/mine',
        element:<Mine/>
    },
    ]
    },
     {
        path:'/cityList',
        element: <CityList/> 
    },
    {
        path:'/search',
        element: <Searchpage/> 
    },
    {
        path:'/maps',
        element:  <Maps/>  
    },{
        path:'/searchHouse',
        element: <SearchHouse/> 
    },{
        path:'/houseDetail',
        element:<KeepAlive cacheKey="9"><Suspense fallback={<Spin/>}><HouseDetail/></Suspense></KeepAlive>
    }, 
     
])
export default router