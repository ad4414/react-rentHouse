import { createHashRouter } from "react-router-dom";
import CityList from "../CityList";
import Layout from "../Layout";
import Searchpage from "../Home/Search/search";
import Maps from "../Home/Map";
import Login from "../Login/login";
import SearchHouse from "../FindHouse/searchHouse";
import { Suspense, lazy } from "react";
import { Spin } from "antd";
const HouseDetail = lazy(() => import("../FindHouse/houseDetail.js"));
const Home = lazy(() => import("../Home"));
const News= lazy(() => import("../News"));
const FindHouse= lazy(() => import("../FindHouse/index.js"));
const Mine= lazy(() => import("../Mine"));
const router = createHashRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spin />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/news",
        element: (
          <Suspense fallback={<Spin />}>
            <News />
          </Suspense>
        ),
      },

      {
        path: "/findHouse",
        element: (
          <Suspense fallback={<Spin />}>
            <FindHouse />
          </Suspense>
        ),
      },
      {
        path: "/mine",
        element: (
          <Suspense fallback={<Spin />}>
            <Mine />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/cityList",
    element: <CityList />,
  },
  {
    path: "/search",
    element: <Searchpage />,
  },
  {
    path: "/maps",
    element: <Maps />,
  },
  {
    path: "/searchHouse",
    element: <SearchHouse />,
  },
  {
    path: "/houseDetail",
    element: <HouseDetail />,
  },
]);
export default router;
