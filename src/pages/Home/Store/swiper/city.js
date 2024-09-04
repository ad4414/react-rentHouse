import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import request from "../../../../api/request";
const cityStore = createSlice({
  name: "citys",
  initialState: {
    cityData: [],
    hotCity: [],
  },
  reducers: {
    setCitys(state, actions) {
      state.cityData = actions.payload;
    },
    setHotCity(state, actions) {
      state.hotCity = actions.payload;
    },
  },
});
const { setCitys, setHotCity } = cityStore.actions;
let cityReducer = cityStore.reducer;

const fetchCity = () => {
  return async (dispatch) => {
    const res = await request.get("/area/city?level=1");
    console.log("get");
    dispatch(setCitys(res.data.body));
  };
};
const fetchHotCity = () => {
  return async (dispatch) => {
    const res = await request.get("/area/hot");
    dispatch(setHotCity(res.data.body));
  };
};
export { fetchCity, fetchHotCity };

export default cityReducer;
