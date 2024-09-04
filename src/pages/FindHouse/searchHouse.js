import {
  NavBar,
  Form,
  Input,
  Button,
  Stepper,
  Selector,
  Popup,
  Toast,
  List,
} from "antd-mobile";
import { useState, useEffect } from "react";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCity, fetchHotCity } from "../Home/Store/swiper/city";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import request from "../../api/request";
let cityId = "AREA|88cff55c-aaa4-e2e0";
let city = "北京";
let houseMessage = [];
const SearchHouse = () => {
  const options1 = [
    {
      label: "是",
      value: "1",
    },
    {
      label: "否",
      value: "2",
    },
  ];
  const options2 = [
    {
      label: "一室",
      value: "ROOM|d4a692e4-a177-37fd",
    },
    {
      label: "二室",
      value: "ROOM|d1a00384-5801-d5cd",
    },
    {
      label: "三室",
      value: "ROOM|20903ae0-c7bc-f2e2",
    },
    {
      label: "四室",
      value: "ROOM|ce2a5daa-811d-2f49",
    },
    {
      label: "四室+",
      value: "ROOM|2731c38c-5b19-ff7f",
    },
  ];
  const options3 = [
    {
      label: "东",
      value: "ORIEN|141b98bf-1ad0-11e3",
    },
    {
      label: "南",
      value: "ORIEN|61e99445-e95e-7f37",
    },
    {
      label: "西",
      value: "ORIEN|103fb3aa-e8b4-de0e",
    },
    {
      label: "北",
      value: "ORIEN|caa6f80b-b764-c2df",
    },
    {
      label: "东南",
      value: "ORIEN|dfb1b36b-e0d1-0977",
    },
    {
      label: "西北",
      value: "ORIEN|80795f1a-e32f-feb9",
    },
    {
      label: "东北",
      value: "ORIEN|67ac2205-7e0f-c057",
    },
    {
      label: "西南",
      value: "ORIEN|2354e89e-3918-9cef",
    },
  ];
  const basicColumns = [
    {
      label: "集中供暖",
      value: "CHAR|f56b9ad7-a97c-b28f",
    },
    {
      label: "双卫生间",
      value: "CHAR|51ae05f0-7c7a-c24b",
    },
    {
      label: "近地铁",
      value: "CHAR|76eb0532-8099-d1f4",
    },
    {
      label: "随时看房",
      value: "CHAR|ee11187b-a631-beef",
    },
    {
      label: "精装",
      value: "CHAR|1d9bf0be-284f-93dd",
    },
    {
      label: "公寓",
      value: "CHAR|2d9fb1b2-dbf9-eb64",
    },
    {
      label: "独立卫生间",
      value: "CHAR|c3d3e453-c3fa-d4af",
    },
    {
      label: "押一付一",
      value: "CHAR|f838b575-9196-bf13",
    },
    {
      label: "独立阳台",
      value: "CHAR|479e8f8a-f193-9605",
    },
    {
      label: "月租",
      value: "CHAR|3870eb95-3f80-e5f8",
    },
    {
      label: "限女生",
      value: "CHAR|014e0e46-2147-8785",
    },
    {
      label: "限男生",
      value: "CHAR|7121e024-499d-c929",
    },
    {
      label: "新上",
      value: "CHAR|41e8322b-3846-d721",
    },
  ];

  const dispatch = useDispatch();
  //获取城市数据
  useEffect(() => {
    dispatch(fetchCity());
    dispatch(fetchHotCity());
  }, [dispatch]);
  const cacheMap = new Map();

  let key = "city";
  let key1 = "hot";
  cacheMap.set(
    key,
    useSelector((state) => state.city.cityData)
  );
  const cityData = cacheMap.get(key);
  cacheMap.set(
    key1,
    useSelector((state) => state.city.hotCity)
  );
  const hotCity = cacheMap.get(key1);
  const formatCity = (list) => {
    let keyCity = [];
    const cityList = {};
    list.forEach((element) => {
      const first = element.short.substr(0, 1);
      //console.log(first);
      //判断cityList中是否有该数据，如果有就加入进去
      //若果没有就创建新的数组
      if (cityList[first]) {
        cityList[first].push(element);
      } else {
        cityList[first] = [element];
      }

      keyCity = Object.keys(cityList).sort();
    });
    return {
      keyCity,
      cityList,
    };
  };
  const { keyCity, cityList } = formatCity(cityData);
  cityList["hot"] = hotCity;
  keyCity.unshift("hot");
  //查询房源数据
  const back = () => {
    navigate("/findHouse");
  };
  //搜索房屋信息
  const [characteristic, setCharacteristic] = useState(""); //标签
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setCharacteristic(value);
  };
  //房屋类型
  const [roomType, setRoomType] = useState("");
  //房屋朝向
  const [oriented, setOriented] = useState("");
  const navigate = useNavigate();
  const [rentType, setRentType] = useState(true);
  const onFinish = (values) => {
    console.log(values.stepper);
    request
      .get(
        `
      /houses?cityId=${cityId}&area=${city}&rentType=${rentType}&price=${values.price}&more=${characteristic}%2CFLOOR%7C${values.stepper}%2C${cityId}%2C${oriented}%2C${rentType}&roomType=${roomType}&oriented=${oriented}&characteristic=${characteristic}&floor=FLOOR%7C${values.stepper}&start=1&end=20`
      )
      .then((result) => {
        console.log(result.data.body.count);
        let count = result.data.body.count;
        if (count !== 0) {
          houseMessage = result.data.body.list;
          navigate("/findHouse");
        }
      });
  };

  const [visible, setVisible1] = useState(false);
  const [value, setValue] = useState("选择城市");
  return (
    <div>
      <NavBar style={{ backgroundColor: "aliceblue" }} onBack={back}>
        查找房屋
      </NavBar>
      <Form
        name="form"
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            搜索
          </Button>
        }
      >
        <Form.Header>选择房屋</Form.Header>
        <Form.Item
          name="price"
          label="价格"
          help="将会显示满足该价格一下的房屋"
        >
          <Input placeholder="请输入价格" />
        </Form.Item>
        <Form.Item
          onClick={() => {
            setVisible1(true);
          }}
        >
          {value}
        </Form.Item>
        <Popup
          closeOnSwipe="true"
          visible={visible}
          onMaskClick={() => {
            setVisible1(false);
          }}
          onClose={() => {
            setVisible1(false);
          }}
          bodyStyle={{ height: "40vh" }}
        >
          <div style={{ height: "40vh", overflowY: "scroll", padding: "20px" }}>
            <div className="city">
              {keyCity.map((ele) => {
                return (
                  <ul style={{ fontSize: "15px" }} key={ele}>
                    {ele}
                    {cityList[ele].map((item) => {
                      return (
                        <List.Item
                          key={item}
                          onClick={(e) => {
                            setValue(e.target.textContent);
                            setVisible1(false);
                            request
                              .get(
                                `/area/community?name=${e.target.textContent}&id=${item.value}`
                              )
                              .then((result) => {
                                if (result.data.body.length === 0) {
                                  Toast.show({
                                    content: "暂时无房源数据",
                                    maskClickable: false,
                                    duration: 2000,
                                  });
                                } else {
                                  cityId = item.value;
                                  city = e.target.textContent;
                                  console.log(cityId, city);
                                }
                              });
                          }}
                        >
                          {item.label}
                        </List.Item>
                      );
                    })}
                  </ul>
                );
              })}
            </div>
          </div>
        </Popup>

        <Form.Item label="是否整租">
          <Selector
            options={options1}
            defaultValue={["1"]}
            onChange={(arr) => setRentType(arr[0] === "1")}
          />
        </Form.Item>
        <Form.Item label="房屋类型">
          <Selector
            options={options2}
            defaultValue={["2", "3"]}
            onChange={(arr) => setRoomType(arr[0])}
          />
        </Form.Item>
        <Form.Item label="房屋朝向">
          <Selector
            options={options3}
            defaultValue={["2", "3"]}
            onChange={(arr) => setOriented(arr[0])}
          />
        </Form.Item>
        <Form.Item label="标签">
          <Select
            defaultValue="未选择"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={basicColumns}
          />
        </Form.Item>
        <Form.Item
          initialValue={0}
          rules={[
            {
              max: 5,
              min: 1,
              type: "number",
            },
          ]}
          name="stepper"
          label="楼层"
        >
          <Stepper />
        </Form.Item>
      </Form>
    </div>
  );
};
export { houseMessage };
export default SearchHouse;
