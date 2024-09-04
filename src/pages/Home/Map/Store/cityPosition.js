import { createSlice } from "@reduxjs/toolkit";
 
import request from "../../../../api/request";
const newsStore = createSlice({
  name: "groups",
  initialState: {
    cityMessage: [],
    cityPosition: [],
  },
  reducers: {
    setPosition(state, actions) {
      state.cityPosition = actions.payload;
    },
    setCityMessage(state, actions) {
      state.cityMessage = actions.payload;
    },
  },
});
const { setPosition, setCityMessage } = newsStore.actions;
let positionReducer = newsStore.reducer;
const fetchPosition = (cityId) => {
  return async (dispatch) => {
    const res = await request.get(`/area/map?id=${cityId}`);
    dispatch(setPosition(res.data.body));
  };
};
const fetchMessage = (cityValue,cityId) => {
  return async (dispatch) => {
    const res = await request.get(
      `/area/community?name=${cityValue}&id=${cityId}`
    );
    dispatch(setCityMessage(res.data.body));
  };
};

export { fetchPosition, fetchMessage };

export default positionReducer;
