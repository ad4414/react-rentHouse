import { configureStore } from "@reduxjs/toolkit";
import swiperReducer from "./swiper";
import groupsReducer from "./swiper/groups";
import newsReducer from "./swiper/news";
import cityReducer from "./swiper/city";
const reducer = configureStore({
  reducer: {
    swiper: swiperReducer,
    groups: groupsReducer,
    news: newsReducer,
    city: cityReducer,
  },
});
export default reducer;
