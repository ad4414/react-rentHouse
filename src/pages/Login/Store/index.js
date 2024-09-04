import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loginStore = createSlice({
  name: "loginData",
  initialState: {
    loginData: {},
  },
  reducers: {
    setLoginData(state, actions) {
      state.loginData = actions.payload;
    },
  },
});
const { setLoginData } = loginStore.actions;
const loginReducer = loginStore.reducer;
const fetchLogin = () => {
  return async (dispatch) => {
    const res = await axios.post(
      'http://hmajax.itheima.net/api/login&username="黑马no1hello"&'
    );
    dispatch(setLoginData(res.data));
  };
};
export { fetchLogin };
export default loginReducer;
