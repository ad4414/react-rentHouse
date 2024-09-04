import { NavBar } from "antd-mobile";
import { FloatButton, Button, Flex, List } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
const News = () => {
  return (
    <div style={{ backgroundColor: "aliceblue" }}>
      <NavBar>咨询</NavBar>
      <FloatButton
        shape="circle"
        type="primary"
        style={{
          right: 94,
        }}
        icon={<WhatsAppOutlined />}
      />
      <Flex
        vertical
        gap="small"
        style={{
          width: "100%",
        }}
      >
        <Button type="primary" block>
          联系房主
        </Button>
        <Button block type="primary">
          点击投诉
        </Button>
        <Button block type="primary">
          咨询客服
        </Button>
      </Flex>
      <List header={<div>历史记录</div>}></List>
    </div>
  );
};
export default News;
