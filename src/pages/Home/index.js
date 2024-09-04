import { Carousel } from "@douyinfe/semi-ui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSwiper } from "./Store/swiper";
import { Button, List, Image } from "antd-mobile";
import groupsReducer, { fetchGroups } from "./Store/swiper/groups";
import { Grid } from "antd-mobile";
import nav1 from "../../asets/images/nav-1.png";
import nav2 from "../../asets/images/nav-2.png";
import nav3 from "../../asets/images/nav-3.png";
import nav4 from "../../asets/images/nav-4.png";
import "../Home/index.scss";
import { cityValue } from "../CityList";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import { fetchNews } from "./Store/swiper/news";

const Home = React.memo(() => {
  //获取轮播图数据
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSwiper());
    dispatch(fetchGroups());
    dispatch(fetchNews());
  }, [dispatch]);
  let key = "swiper";
  let key1 = "group";
  let key2 = "news";
  const cacheMap = new Map();
  cacheMap.set(
    key,
    useSelector((state) => state.swiper.swiperData)
  );
  const swiperData = cacheMap.get(key);
  //获取分组数据
  cacheMap.set(
    key1,
    useSelector((state) => state.groups.groupsData)
  );
  const groupsData = cacheMap.get(key1);
  //获取news数据
  cacheMap.set(
    key2,
    useSelector((state) => state.news.news)
  );
  const news = cacheMap.get(key2);
  const navigate = useNavigate();
  //添加点击事件
  const handClick = () => {
    navigate("/findHouse");
  };
  const [id, setId] = useState(0);
  const hightLightClick = (uid) => {
    setId(uid);
    setTimeout(() => {
      setId(0);
    }, 300);
  };

  //获取点击城市
  return (
    <div style={{ overflow: "auto", height: "980px" }}>
      {/* 搜索栏 */}
      <div className="search">
        <Button
          size="mini"
          color="primary"
          fill="solid"
          className="btn"
          onClick={() => {
            navigate("/cityList");
          }}
        >
          {cityValue}
        </Button>

        <input
          type="text"
          onClick={() => {
            navigate("/search");
          }}
          className="search-city"
          placeholder="搜索城市"
        />
        <Button
          onClick={() => {
            navigate("/maps");
          }}
          className="btn"
          color="primary"
          fill="solid"
          size="mini"
        >
          定位
        </Button>
      </div>
      {/* 轮播图 */}

      <Carousel className="swiper" theme="dark">
        {swiperData.map((ele) => {
          return (
            <div
              key={ele.id}
              style={{
                backgroundSize: "cover",
                backgroundImage: `url(http://localhost:8080${ele.imgSrc})`,
              }}
            ></div>
          );
        })}
      </Carousel>

      {/* 导航栏 */}
      <Grid columns={4} gap={5} className="nav">
        <Grid.Item onClick={handClick}>
          <Image src={nav1} loading="lazy" />
          <h2>整租</h2>
        </Grid.Item>
        <Grid.Item onClick={handClick}>
          <Image src={nav2} loading="lazy" />
          <h2>合租</h2>
        </Grid.Item>
        <Grid.Item onClick={handClick}>
          <Image src={nav3} loading="lazy" />
          <h2>地图找房</h2>
        </Grid.Item>
        <Grid.Item onClick={handClick}>
          <Image src={nav4} loading="lazy" />
          <h2>去出租</h2>
        </Grid.Item>
      </Grid>
      <div className="groups">
        <h3 className="title">
          租房小组
          <span className="more">更多</span>
        </h3>
      </div>
      <div className="container">
        {groupsData.map((ele) => {
          return (
            <div
              key={ele.id}
              className={classnames("box", ele.id === id ? "highlight" : "")}
              onClick={() => hightLightClick(ele.id)}
            >
              <div className="box2" style={{ flex: 1, textAlign: "left" }}>
                <Image
                  src={`http://localhost:8080${ele.imgSrc}`}
                  loading="lazy"
                  className="imgGrid"
                />
              </div>
              <div className="box1" style={{ flex: 2, justifyContent: "left" }}>
                <p className="text">
                  <strong>{ele.title}</strong>
                  <br></br>
                  <p>{ele.desc}</p>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="news" style={{ overflow: "auto" }}>
        <h3 className="title">
          新闻资讯
          <span className="more">更多</span>
        </h3>
        <List>
          {news.map((ele, index) => (
            <List.Item
              key={index}
              prefix={
                <Image
                  src={`http://localhost:8080${ele.imgSrc}`}
                  style={{ borderRadius: 20 }}
                  fit="cover"
                  width={40}
                  height={40}
                />
              }
              description={ele.from}
            >
              {ele.title}
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
});
export default Home;
