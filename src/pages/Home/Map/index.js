import React, { useEffect } from "react";
import { NavBar } from "antd-mobile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Map, APILoader, Label, Marker } from "@uiw/react-baidu-map";
import { Button, Input } from "antd-mobile";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessage, fetchPosition } from "./Store/cityPosition";
import { cityValue } from "../../CityList";
let BMAP_ANCHOR_TOP_RIGHT = 1;
const Maps = () => {
  const navigate = useNavigate();
  //获取输入内容
  const [value, setValue] = useState("");
  //获取地点位置信息
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosition());
    dispatch(fetchMessage());
  }, [dispatch]);
  const cityMessage = useSelector((state) => state.position.cityMessage); //城市小区地址信息
  const cityPosition = useSelector((state) => state.position.cityPosition); //城市有房的小区名称
  //提供center信息
  const [center, setCenter] = useState(cityValue);
  //点击返回
  const backClick = () => {
    navigate("/");
  };
  //获取城市选择信息

  const handClick = () => {
    setCenter(value);
  };
  //获取该城市总的房屋数量
  let counts = 0;
  for (const ele of cityPosition) {
    counts += ele.count;
  }
  let content = "";
  content = center + "共有" + counts + "间出租屋";
  //是否显示小区信息
  const [visitable, setVisible] = useState(false);
  const showVisible = ({ type, target }) => {
    console.log(type, target);
    console.log(visitable);
    setVisible(!visitable);
  };
  /* let iconShapePoint =  new window.BMap.Symbol(window.BMap_Symbol_SHAPE_POINT, {
  scale: 2, // 图标缩放大小
  fillColor: "orange", // 填充颜色
  fillOpacity: 0.8, // 填充透明度
})  */
  return (
    <div style={{ width: "100%", height: "750px" }}>
      <div className="backGround">
        <div className="back">
          <NavBar onBack={backClick}>地图</NavBar>
        </div>
        <Input
          placeholder="请输入内容"
          value={value}
          className="mapInput"
          onChange={(val) => {
            setValue(val);
          }}
        />
        <Button
          className="btns"
          color="primary"
          fill="solid"
          onClick={handClick}
        >
          搜索
        </Button>
      </div>
      <div>{content}</div>
      <APILoader akay="gS19qDxhOkl8EJJXf9GfIrVjyZJ5frTB">
        <Map
          enableScrollWheelZoom={true}
          center={center}
          widget={[
            "GeolocationControl",
            {
              name: "OverviewMapControl",
              options: {
                isOpen: true,
              },
            },
            {
              name: "CopyrightControl",
              control: (BMap, map) => {
                // 设置版权控件位置
                const cr = new BMap.CopyrightControl({
                  anchor: BMAP_ANCHOR_TOP_RIGHT,
                });
                // 返回地图可视区域
                const bs = map.getBounds();
                cr.removeCopyright(1);
                cr.addCopyright({
                  id: 1,
                  content: "",
                  // bounds: bs,
                });
                return cr;
              },
            },
            {
              name: "NavigationControl",
              options: (BMap) => {
                return {
                  offset: new BMap.Size(150, 5),
                  showZoomInfo: false,
                  enableGeolocation: true,
                };
              },
            },
          ]}
          onClick={(e) => {
            console.log(e.Wa);
          }}
        >
          {cityPosition.map((ele) => {
            const checkCity = (item) => {
              return item.area === ele.value;
            };
            let preAddress = cityMessage.find(checkCity);
            return (
              <Marker
                key={ele.count}
                onClick={showVisible}
                position={{ lng: ele.coord.longitude, lat: ele.coord.latitude }}
              >
                {preAddress && (
                  <Label
                    key={ele.label}
                    visiable={visitable}
                    className="preLabel"
                    position={{
                      lng: ele.coord.longitude,
                      lat: ele.coord.latitude,
                    }}
                    content={`${ele.label}共有房子${ele.count}套,街道名称:${
                      preAddress && preAddress.communityName
                    },社区名称:${preAddress && preAddress.streetName}`}
                    style={{
                      width: "150px",
                      height: "63px",
                      whiteSpace: "pre-wrap",
                    }}
                  />
                )}
              </Marker>
            );
          })}
        </Map>
      </APILoader>
    </div>
  );
};
export default Maps;
