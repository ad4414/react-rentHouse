import { NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { Avatar, List, Modal, Toast } from "antd-mobile";
import png2 from "../../asets/images/2.jpg";
import {
  PhoneFill,
  EditSOutline,
  SetOutline,
  MessageOutline,
  MailFill,
  LocationOutline,
  FolderOutline,
} from "antd-mobile-icons";
const Mine = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="back">
        <NavBar onBack={back}>个人信息</NavBar>
      </div>
      <span>头像</span>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          src={png2}
          style={{
            "--size": "90px",
            "--border-radius": "50%",
            textAlign: "center",
          }}
        />
      </div>
      <List header="个人信息列表">
        <List.Item prefix={<MessageOutline />} extra="111" onClick={() => {}}>
          昵称
        </List.Item>
        <List.Item prefix={<EditSOutline />} extra="200..." onClick={() => {}}>
          账号
        </List.Item>
        <List.Item prefix={<PhoneFill />} extra="100..." onClick={() => {}}>
          电话号码
        </List.Item>
        <List.Item prefix={<MailFill />} extra="3400..." onClick={() => {}}>
          邮箱
        </List.Item>
        <List.Item
          prefix={<LocationOutline />}
          extra="河南省..."
          onClick={() => {}}
        >
          家庭住址
        </List.Item>
        <List.Item
          prefix={<FolderOutline />}
          extra="北京市..."
          onClick={() => {}}
        >
          我的收藏
        </List.Item>
        <List.Item prefix={<SetOutline />} onClick={() => {}}>
          设置
        </List.Item>
        <List.Item
          style={{ display: "flex", justifyContent: "center", color: "red" }}
          onClick={async () => {
            const result = await Modal.confirm({
              content: "是否退出登录",
            });
            if (result) {
              Toast.show({ content: navigate("/login"), position: "bottom" });
            } else {
              Toast.show({ content: "点击了取消", position: "bottom" });
            }
          }}
        >
          退出登录
        </List.Item>
      </List>
    </div>
  );
};
export default Mine;
