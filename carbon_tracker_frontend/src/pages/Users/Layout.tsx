import useAuth from '@/Auth/store'
import { Navigate, Outlet } from 'react-router'

function Layout() {
  const checkLogin= useAuth((state) => state.checkLogin);

  const isLoggedIn = checkLogin();
  
  if(!isLoggedIn){

    return <Navigate to={"/login"} replace/>
  }
    
  return <Outlet/>
}

export default Layout
