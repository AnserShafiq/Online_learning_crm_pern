import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Navbar from "./component/Navbar"
import Signin from "./pages/signin"
import { useUserStore } from "./stores/useUserStore"
import { useEffect } from "react"
import Login from "./pages/login"

const App = () => {

  const {user, checkAuth } = useUserStore();

  useEffect(() => {
    console.log('Going to check auth')
    checkAuth()
  },[checkAuth])

  return (
<div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
			{/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>

			<div className='relative z-50 pt-20'>
        <Navbar user={user}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={!user? <Login />: <Navigate to='/'/>} />
          <Route path='/signin' element={!user? <Signin />: <Navigate to='/'/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App