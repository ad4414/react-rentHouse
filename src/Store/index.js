import {configureStore} from '@reduxjs/toolkit'
import swiperReducer from '../pages/Home/Store/swiper'
import groupsReducer from '../pages/Home/Store/swiper/groups'
import newsReducer from '../pages/Home/Store/swiper/news'
import cityReducer from '../pages/Home/Store/swiper/city'
import positionReducer from '../pages/Home/Map/Store/cityPosition'
import loginReducer from '../pages/Login/Store'
const reducer=configureStore({
    reducer:{
        swiper:swiperReducer,
        groups:groupsReducer,
        news:newsReducer,
        city:cityReducer,
        position:positionReducer,
        login:loginReducer
    }
})
export default reducer