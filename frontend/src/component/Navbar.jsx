import { Link } from "react-router-dom"
import { useUserStore } from "../stores/useUserStore"
import {LogIn} from 'lucide-react'
import { AgentsMenu, HeadManagerMenu } from "../assets/navbaroptions"
 
const Navbar = () => {
    const {logout, user} = useUserStore()
    const userData=user;
    // if(userData){
    //     console.log('User from header => ', userData)
    // }
    return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
        <div className="mx-auto px-4 py-3 lg:w-container-md xl:w-container-lg ">
            <div className="flex flex-wrap items-center justify-between">
                <Link to={'/'} className="text-2xl font-bold text-emerald-400 items-center space-x-2 flex">
                    Shopkart
                </Link>
                <nav className="flex flex-wrap items-center space-x-4">
                    {
                        userData !== null? (
                            <>
                                <h4 className="text-sm text-emerald-500 border-b border-emerald-500">Welcome, {userData?.name} !!!</h4>
                                {
                                    userData?.user_type === 'Head Manager'  ?     
                                    HeadManagerMenu.map((Menu, index) => (
                                        <Link key={index} to={Menu.link} className="text-gray-300 hover:text-emerald-400 hover:border-b hover:border-emerald-400 transition font-normal duration-300 ease-in-out">
                                            {Menu.name}
                                        </Link>
                                    )):
                                    AgentsMenu.map((Menu, index) => (
                                        <Link key={index} to={Menu.link} className="text-gray-300 hover:text-emerald-400 hover:border-b hover:border-emerald-400 transition font-normal duration-300 ease-in-out">
                                            {Menu.name}
                                        </Link>
                                    ))
                                }
                                <button className="
                                text-emerald-600 hover:text-gray-300 bg-transparent border-2 font-[500] border-emerald-600 hover:border-gray-300 py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out
                                " onClick={() => {
                                    logout()
                                }}>
                                    <LogIn className="mr-2 h-5"/> Logout 
                                </button>
                            </>
                            
                        ):(
                            <>
                                <Link to={'/signin'} className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out">
                                    Sign In
                                </Link>
                                <Link to={'/login'} className="text-emerald-600 hover:text-gray-300 bg-transparent border-2 font-semibold border-emerald-600 hover:border-gray-300 py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out">
                                Log In
                                </Link>
                            </>
                        )
                    }
                </nav>
            </div>
        </div>
    </header>
  )
}

export default Navbar