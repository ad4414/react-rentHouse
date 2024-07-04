import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { cityValue,cityId } from "../../../CityList";
const newsStore=createSlice({
name:'groups',
initialState:{
    cityMessage:[],
    cityPosition:[]
},
reducers:{
    
    setPosition(state,actions){
        state.cityPosition=actions.payload
    },
    setCityMessage(state,actions){
        state.cityMessage=actions.payload
    }
}
})
const {setPosition,setCityMessage}=newsStore.actions
let positionReducer=newsStore.reducer
const fetchPosition=()=>{
    return async (dispatch)=>{
     const res=await   axios.get(`http://localhost:8080/area/map?id=${cityId}`)
    dispatch(setPosition(res.data.body))

    }
}
const fetchMessage=()=>{
    return async (dispatch)=>{
     const res=await   axios.get(`http://localhost:8080/area/community?name=${cityValue}&id=${cityId}`)
    dispatch(setCityMessage(res.data.body))

    }
}

export {fetchPosition,fetchMessage}

export default  positionReducer