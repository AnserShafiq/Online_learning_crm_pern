import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Navbar from "./component/Navbar"
import Signin from "./pages/signin"
import { useUserStore } from "./stores/useUserStore"
import { useEffect } from "react"
import Login from "./pages/login"
import AgentDashboard from "./pages/agents/dashboard"
import { Suspense } from "react"
import HMDashboard from "./pages/headmanagers/dashboard"


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
        <Navbar />
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center justify-center lg:w-container-md xl:w-container-lg px-4">
            <Suspense fallback={<h3>Loading...</h3>}>
              <Routes>
                <Route 
                  path='/' 
                  element={
                    !user ? <Home /> : user.user_type === 'Head Manager' ? <Navigate to='/hm/dashboard' /> : <Navigate to='/user/dashboard' />
                  } 
                />

                <Route path='/login' element={!user? <Login />: <Navigate to='/'/>} />
                <Route path='/signin' element={!user? <Signin />: <Navigate to='/'/>} />
                <Route path='/user/dashboard/*' element={user && user.user_type !== 'Head Manager' ?<AgentDashboard />: <Navigate to={'/'}/>} />
                <Route path='/hm/dashboard' element={user && user.user_type === 'Head Manager' ?<HMDashboard />: <Navigate to={'/'}/>} />
              </Routes>
            </Suspense>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App