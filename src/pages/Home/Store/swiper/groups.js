import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import request from "../../../../api/request";
const swiperStore = createSlice({
  name: "groups",
  initialState: {
    groupsData: [],
  },
  reducers: {
    setGroups(state, actions) {
      state.groupsData = actions.payload;
    },
  },
});
const { setGroups } = swiperStore.actions;
let groupsReducer = swiperStore.reducer;

const fetchGroups = () => {
  return async (dispatch) => {
    const res = await  request.get(
      "/home/groups?area=AREA%7C88cff55c-aaa4-e2e0"
    );

    dispatch(setGroups(res.data.body));
  };
};

export { fetchGroups };

export default groupsReducer;
