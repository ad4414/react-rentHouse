import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const swiperStore=createSlice({
name:'swiper',
initialState:{
    swiperData:[],
     
},
reducers:{
    setSwiper(state,actions){
        state.swiperData=actions.payload
    },
   
}
})
const {setSwiper}=swiperStore.actions
let swiperReducer=swiperStore.reducer
const fetchSwiper=()=>{
    return async (dispatch)=>{
     const res=await   axios.get('http://localhost:8080/home/swiper')
    dispatch(setSwiper(res.data.body))
   
    }
}
 

export {fetchSwiper }

export default swiperReducer