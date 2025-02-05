import { motion } from 'framer-motion'
import { ArrowRight, CircleUser, Loader, Lock, LogIn } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'

const Login = () => {
    const {login, loading} = useUserStore()
    const handleSubmission = (e) => {
        e.preventDefault()
        const formData= new FormData(e.target)
        login(formData)
    }
    return (
    <div className="flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
        <motion.div
            className=' lg:w-fit sm:mx-auto sm:w-full'
            initial={{opacity:0,y:-20}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5}}
        >
            <h3 className='mx-auto text-center text-3xl font-extrabold text-emerald-400 capitalize'>To get Logged In</h3>
        </motion.div>
        <motion.div
        className=' mt-8 py-10 px-10 rounded-xl bg-gray-800 w-[500px] mx-auto'
        initial={{opacity:0,y:30}}
        animate={{opacity:1,y:0}}
        transition={{duration: 0.75, delay:0.3}}
        >
        <form onSubmit={handleSubmission} className="space-y-6">
            <div className="flex flex-col">
                
                <label className='block text-sm font-medium text-gray-300'>Username</label>
                <div className='relative rounded-md shadow-sm '>
                    <div className='absolute inset-y-0 left-0 pl-3 pt-1 flex items-center pointer-events-none'>
                        <CircleUser className='h-5 w-5 text-gray-400'/>
                    </div>
                    <input className="text-black block w-full py-2 px-3 pl-10 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" type='text' placeholder="Enter your username..." name='username' id='username' required/>
                </div>
                
            </div>
            <div className="flex flex-col">
                
                <label className='block text-sm font-medium text-gray-300'>Password</label>
                <div className='relative rounded-md shadow-sm '>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <Lock className='h-5 w-5 text-gray-400'/>
                    </div>
                    <input className="text-black block w-full py-2 px-3 pl-10 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" type='text' placeholder="Enter your username..." name='password' id='password' required/>
                </div>
                
            </div>
            <button type="submit" disabled={loading} className='w-full flex items-center justify-center rounded-md py-2 bg-emerald-700 text-sm'>
                {
                    loading ? (
                        <>
                            <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true'/>
                            Loading...
                        </>
                    ):(
                        <>
                        <LogIn className='mr-2 h-5 w-5' aria-hidden='true'/>
                            Log In
                        </>
                    )
                }
            </button>
            <div className='flex justify-center mt-8 mb-10'>
                <h3 className='text-sm text-gray-400'>Not a member? <Link to={'/signin'} className='text-emerald-600 inline-flex hover:border-b hover:border-emerald-600 hover:text-gray-300'>Sign up now <ArrowRight className='h-4 my-auto'/></Link></h3>
            </div>
        </form>
        </motion.div>
    </div>
  )
}

export default Login