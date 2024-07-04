import { SearchBar ,NavBar} from "antd-mobile"
 
import './index.scss'
import { Dialog ,Toast} from "antd-mobile"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
const Searchpage=()=>{
    const navigate=useNavigate()
    const backClick=()=>{
      navigate('/home')
    }
    //获取存在本地的数据
    const historyList=JSON.parse(localStorage.getItem('search-history'))
    console.log(historyList===null);
    //确认删除
    const confirmClick= (e)=>{
       Dialog.confirm({
        content: '是否删除',
         
        closeOnAction: true,
        actions:  [
          {
            key: 'cancel',
            text: '取消',
          },
          {
            key: 'delete',
            text: '删除',
            bold: true,
            danger: true,
          },
        ],
       onConfirm:async ()=>{
       Toast.show(
           {
             icon: 'success',
             content: '删除成功',
             position: 'bottom',
           }
         )
         localStorage.clear('search-history')
       window.location.reload()
       }
          }
          )
           
          console.log(e.target);
    }
    //点击历史记录跳转到对应页面
    const [inputValue,setInputValue]=useState('请输入内容')
     const isClick=(e)=>{
       console.log(e.target.textContent);
       setInputValue(e.target.textContent)
     }
    return <div>
        <div className="back">
          
             <NavBar onBack={backClick}>搜索城市</NavBar>
          
        </div>
        <SearchBar className="input"
        onSearch={(value)=>{
         console.log(value); 
         if (value.trim() !== '') {
          const history = JSON.parse(localStorage.getItem('search-history')) || [];
          if (!history.includes(value)) {
            history.push(value);
            localStorage.setItem('search-history', JSON.stringify(history));
          }
        }
         navigate('/cityList')
        }}

        placeholder={inputValue}/>
       
        <div style={{display:'flex'}}>
             <p className="history">历史记录</p>
        <p className="clearHistory" onClick={confirmClick}>清除历史记录</p>
        </div>
       <div style={{display:'flex'}}>
        {
         !(historyList===null) ?
          historyList.map((ele,index)=>{
            return  <li key={index} className="listHistory" onClick={isClick} >
                 {ele}
            </li>
          }) : '无历史记录'
        }
       </div>
    </div>
}
export default Searchpage