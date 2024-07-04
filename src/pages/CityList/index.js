import { Button,Popup ,NavBar,Toast} from "antd-mobile"
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
 
import { fetchCity, fetchHotCity } from "../Home/Store/swiper/city"
 
import './index.scss'
import { useNavigate } from "react-router-dom"
import axios from "axios"
let cityValue='深圳'
let cityId='AREA|a6649a11-be98-b150'
const City=React.memo(()=>{
     const navigate=useNavigate()
      const dispatch=useDispatch()
    //获取城市数据
      useEffect(()=>{
     dispatch(fetchCity())
     dispatch(fetchHotCity())
    },[dispatch])
    const cacheMap=new Map()//将获取的数据存在Map中
    let key='city'
   let key1='hot'
    cacheMap.set(key,useSelector(state=>state.city.cityData))
     const cityData=cacheMap.get(key)
   
    cacheMap.set(key1,useSelector(state=>state.city.hotCity))
     const hotCity=cacheMap.get(key1)
  
    const formatCity=useCallback((list)=>{
      let keyCity=[]
      const cityList={}
        list.forEach(element => {
          const first=element.short.substr(0,1)
          //console.log(first);
          //判断cityList中是否有该数据，如果有就加入进去
          //若果没有就创建新的数组
          if(cityList[first]){
           cityList[first].push(element)
          }else{
          cityList[first]=[element]
          }
          
        keyCity=Object.keys(cityList).sort()
        });
      return {
        keyCity,
        cityList
      }
      
    },[])
    const {keyCity,cityList}=formatCity(cityData)
    cityList['hot']=hotCity
    keyCity.unshift('hot')
    //查询房源数据
    return  <div className="city">
       
          {keyCity.map((ele)=>{
             return <ul key={ele}style={{fontSize:'15px'}}>
              {ele}
              {
                cityList[ele].map(item=>{
                  return  <li key={item.value} onClick={(e)=>{
                  console.log(item.value);
               axios({
                url:`http://localhost:8080/area/community?name=${e.target.textContent}&id=${item.value}`
                 
               }).then(result=>{
                console.log(result);
                if(result.data.body.length===0){
                  Toast.show({
                      content:'暂时无房源数据',
                      maskClickable:false,
                      duration:2000
                    })
                }else{
                   cityValue=e.target.textContent
                   cityId=item.value
                     navigate('/home')
                }
               })
                   
                 
                    }}>{item.label}</li>
                })
              }
                
             </ul>
            
        })}
      
      
    </div>
}
)

const CityList=()=>{

    const [visible,setVisible1]=useState(false)
    const navigate=useNavigate()
  const backClick=()=>{
   navigate('/home')
  }
    return <div>
        <div>
        <div className="back" >
        <NavBar onBack={backClick}>城市选择</NavBar>
        </div>
        </div>
         <Button
              onClick={() => {
                setVisible1(true)
              }}
            >
              选择城市
            </Button>
            <Popup
            closeOnSwipe='true'
              visible={visible}
              onMaskClick={() => {
                setVisible1(false)
              }}
              onClose={() => {
                setVisible1(false)
              }}
              bodyStyle={{ height: '40vh' }}
            >
                <div style={{ height: '40vh', overflowY: 'scroll', padding: '20px'}}>
                       <City/>
                </div>
            
            </Popup>
    </div>

}
export {cityValue,cityId}
export default CityList