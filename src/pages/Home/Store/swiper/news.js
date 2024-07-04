import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const newsStore=createSlice({
name:'groups',
initialState:{
    
    news:[]
},
reducers:{
    
    setNews(state,actions){
        state.news=actions.payload
    }
}
})
const {setNews}=newsStore.actions
let newsReducer=newsStore.reducer
 
const fetchNews=()=>{
    return async (dispatch)=>{
     const res=await   axios.get('http://localhost:8080/home/news?area=AREA%7C88cff55c-aaa4-e2e0')
    dispatch(setNews(res.data.body))

    }
}

export {fetchNews}

export default  newsReducer