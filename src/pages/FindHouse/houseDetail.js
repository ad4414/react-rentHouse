import { NavBar } from "antd-mobile"
import { useNavigate } from "react-router-dom"
import {Image, Table } from 'antd'
 import {res} from './index'
const HouseDetail=()=>{
  //表格标签
  console.log(res.body.supporting.length===0);
  const columns = [
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '社区名称',
      dataIndex: 'community',
      key: 'community',
    },
    {
      title: '房屋类型',
      dataIndex: 'roomType',
      key: 'roomType',
    },{
      title:'面积',
      dataIndex:'size',
      key:'size'
    },{
      title:'朝向',
      dataIndex:'oriented',
      key:'oriented'
    }
  ];
  const fixedColumns = [
    {
      title: 'tags',
      dataIndex: 'tags',
      fixed: true,
      width: 100,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
  ];
  const fixedData=[{
    key:'1',
    tags:'楼层',
    description:res.body.floor
  },{
    key:'2',
    tags:'描述',
    description:res.body.description==='' ? '无' :res.body.description
  },{
    key:'3',
    tags:'特点',
    description:res.body.tags===''? '无': res.body.tags
  },{
    key:'4',
    tags:'家用物品',
    description:res.body.supporting.length===0 ? '无':res.body.supporting
  }
]
  const dataSource=[
    {
      key:'1',
      price:res.body.price,
      community:res.body.community ,
      roomType:res.body.roomType,
      size:res.body.size,
      oriented:res.body.oriented
    }
  ]
  const navigate=useNavigate()
    const back=()=>{
      navigate('/findHouse')
    }
    
   console.log(res.body.houseImg);
    return <div>
       <NavBar style={{backgroundColor:'aliceblue'}} onBack={back}>房屋信息</NavBar>
       <h2 style={{display:'flex',justifyContent:'center'}}>房源照片</h2>
       <Image.PreviewGroup 
    preview={{
      onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
    }}
  >
    {res.body.houseImg.map((ele)=>{
      return <Image key={ele} src={`http://localhost:8080${ele}`} width={window.screen.width}/>
    })}
  </Image.PreviewGroup>
  <h2 style={{display:'flex',justifyContent:'center'}}>房源信息</h2>
  <div>
  <Table bordered={true} pagination={false} dataSource={dataSource} columns={columns}/>
  <br/>
  <Table bordered={true} pagination={false} dataSource={fixedData} columns={fixedColumns}/>
  </div>
    </div>
}
export default HouseDetail