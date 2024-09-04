import { NavBar, Image, List } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { Empty, Pagination } from "antd";
import { EnvironmentOutline } from "antd-mobile-icons";
import { houseMessage } from "./searchHouse";
import { useState } from "react";
import request from "../../api/request";
let res;
const page = 8;
const cacheMap = new Map();
const FindHouse = () => {
  const navigate = useNavigate();
  let key = "house";
  cacheMap.set(key, houseMessage);
  let houseAll = cacheMap.get(key);
  const back = () => {
    navigate("/");
  };
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const currentData = houseAll.slice(
    (currentPage - 1) * page,
    currentPage * page
  ); //对数据进行分割
  return (
    <div>
      <NavBar style={{ backgroundColor: "aliceblue" }} onBack={back}>
        找房
      </NavBar>
      <List>
        <List.Item
          prefix={<EnvironmentOutline />}
          onClick={() => {
            navigate("/searchHouse");
          }}
          style={{ border: "1px solid gray" }}
        >
          点击查找房屋
        </List.Item>
      </List>
      <div>
        <List header="房屋详情">
          {currentData.map((ele, index) => {
            return (
              <List.Item
                key={index}
                style={{
                  backgroundColor: "#FAFAD2",
                  border: "1px solid black",
                }}
                prefix={
                  <Image
                    src={`http://localhost:8080${ele.houseImg}`}
                    style={{ borderRadius: 20 }}
                    fit="cover"
                    width={40}
                    height={40}
                  />
                }
                description={ele.desc}
                onClick={() => {
                  request.get(
                     `/houses/${ele.houseCode}`,
                  ).then((result) => {
                    console.log(result);
                    res = result.data;
                    navigate("/houseDetail");
                  });
                }}
              >
                {ele.title}
              </List.Item>
            );
          })}
        </List>
      </div>

      {houseAll.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <Pagination
          showSizeChanger
          defaultCurrent={1}
          defaultPageSize={page}
          total={houseMessage.length}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};
export { res };
export default FindHouse;
