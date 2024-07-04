import { Navigate } from 'react-router-dom'
 
const AuthRouter=({children})=>{
    
         return <Navigate to='/login' replace/>
    
   
}

export default AuthRouter