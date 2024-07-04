import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const cityStore=createSlice({
name:'citys',
initialState:{
    
    cityData:[],
    hotCity:[]
},
reducers:{
    
    setCitys(state,actions){
        state.cityData=actions.payload
    },
    setHotCity(state,actions){
     state.hotCity=actions.payload
    }
}
})
const {setCitys,setHotCity}=cityStore.actions
let cityReducer=cityStore.reducer
 
const fetchCity=()=>{
    return async (dispatch)=>{
     const res=await   axios.get('http://localhost:8080/area/city?level=1')
   console.log('get');
    dispatch(setCitys(res.data.body))
    }
}
const fetchHotCity=()=>{
    return async (dispatch)=>{
        const res=await axios.get('http://localhost:8080/area/hot')
        dispatch(setHotCity(res.data.body))
    }
}
export {fetchCity,fetchHotCity}

export default cityReducer