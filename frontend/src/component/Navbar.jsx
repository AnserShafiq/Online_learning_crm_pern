import { Link } from "react-router-dom"
import { useUserStore } from "../stores/useUserStore"


const Navbar = (user) => {
    const {logout} = useUserStore()
    if(user.user !== null){
        console.log('User not null')
    }
    return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
        <div className="container mx-auto px-4 py-3">
            <div className="flex flex-wrap items-center justify-between">
                <Link to={'/'} className="text-2xl font-bold text-emerald-400 items-center space-x-2 flex">
                    Shopkart
                </Link>
                <nav className="flex flex-wrap items-center space-x-4">
                    <Link to={'/'} className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out">
                        Home
                    </Link>
                    <Link to={'/signin'} className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out">
                        Sign In
                    </Link>
                    {
                        user.user !== null? (
                            <button onClick={() => {
                                logout()
                            }}>Logout</button>
                        ):(
                            <Link to={'/login'} className="text-emerald-600 hover:text-gray-300 bg-transparent border-2 font-semibold border-emerald-600 hover:border-gray-300 py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out">
                            Log In
                            </Link>
                        )
                    }
                </nav>
            </div>
        </div>
    </header>
  )
}

export default Navbar