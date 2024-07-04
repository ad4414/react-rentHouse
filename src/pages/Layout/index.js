import {  Outlet } from "react-router-dom"
import { TabBar } from "antd-mobile"
import '../Layout/index.scss'
import { useNavigate,useLocation } from "react-router-dom"
import {
    TagOutline,
    TextOutline,
    SearchOutline,
    UserContactOutline
  } from 'antd-mobile-icons'
const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <TagOutline />,
    },
    {
      key: '/findHouse',
      title: '找房',
      icon: <SearchOutline />,
    },
    {
      key: '/news',
      title: '咨询',
      icon: <TextOutline />,
    },
    {
        key: '/mine',
        title: '我的',
        icon: <UserContactOutline/>,
    }
  ]
const Layout=()=>{
const navigate=useNavigate()
const location=useLocation()
    return  <div className="kaLayout">
    <div className="page">
      {/* 二级路由出口 */}
      <Outlet />                  
    </div>
  <div className="tab">
     <TabBar
      className="tabbar"
      activeKey={location.pathname}
      onChange={key => navigate(key)}
    >
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  </div>
   
  </div>
}
export default Layout