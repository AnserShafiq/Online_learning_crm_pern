import {motion} from 'framer-motion'
import { useEffect, useState } from 'react';
import {Building2, LockKeyholeOpen, Mail, Shapes, User, UserPlus, Users} from 'lucide-react'
import { useUserStore } from '../stores/useUserStore.js'
import { useGetData } from '../stores/useGetData.js';
const Signin = () => {
    const {managersList, gettingManagers} = useGetData();
    const [usertype, setUserType] = useState('')
    const {signup} = useUserStore();

    useEffect(()=> {
        gettingManagers()
    },
    [gettingManagers])
    console.log('==> ', managersList)
    const userTypes = [
        'Sale Agent',
        'Sale Manager',
        'Graphic Designer',
        'Accountant',
        'Clerk'
    ]
    const handleSubmission = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        signup(formData)
    };

  return (
    <div className="flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
        <motion.div
            className=' lg:w-fit sm:mx-auto sm:w-full'
            initial={{opacity:0,y:-20}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5}}
        >
            <h3 className='mx-auto text-center text-3xl font-extrabold text-emerald-400 capitalize'>Create your account</h3>
        </motion.div>

        <motion.div
        className=' mt-8 py-8 px-6 rounded-xl bg-gray-800 px-4 w-[500px] mx-auto'
        initial={{opacity:0,y:30}}
        animate={{opacity:1,y:0}}
        transition={{duration: 0.75, delay:0.3}}
        >

        <form onSubmit={handleSubmission} className="space-y-6">
            <div className="flex flex-col">
                
                <label className='block text-sm font-medium text-gray-300'>Agent&apos;s Name</label>
                <div className='relative rounded-md shadow-sm '>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <User className='h-5 w-5 text-gray-400'/>
                    </div>
                    <input className="text-black block w-full py-2 px-3 pl-10 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" type='text' placeholder="Agent's Name..." name='name' id='name' required/>
                </div>
                
            </div>
            <div className="flex flex-col relative rounded-md shadow-sm">
                <label className='block text-sm font-medium text-gray-300'>Gender</label>
                <div className='relative rounded-md shadow-sm '>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <Shapes className='h-5 w-5 text-gray-400'/>
                    </div>
                    <select name='gender' className="text-black block w-full py-2 px-3 pl-10 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" id="gender" required>
                        <option value={''} disabled selected>Select Option</option>
                        <option value={'Male'}>Male</option>
                        <option value={'Female'}>Female</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col relative rounded-md shadow-sm">
                <label className='block text-sm font-medium text-gray-300'>Email Id</label>
                <div className='relative rounded-md shadow-sm '>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <Mail className='h-5 w-5 text-gray-400'/>
                    </div>
                    <input className="text-black block w-full py-2 px-3 pl-10 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" type='email' placeholder="Agent's Email..." name='email' id='email' required/>
                </div>
            </div>

            <div className="flex flex-col relative rounded-md shadow-sm">
                <label className='block text-sm font-medium text-gray-300'>Profile Password</label>
                <div className='relative rounded-md shadow-sm '>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <LockKeyholeOpen className='h-5 w-5 text-gray-400'/>
                    </div>
                    <input className="text-black block w-full py-2 px-3 pl-10 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" type='text' placeholder="Password..." name='password' id='password' required/>
                </div>
                
            </div>            
            <div className="flex flex-col relative rounded-md shadow-sm">
                <label className='block text-sm font-medium text-gray-300'>User Type</label>
                
                <div className='relative rounded-md shadow-sm '>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <Users className='h-5 w-5 text-gray-400'/>
                    </div>
                    <select name="usertype" onChange={(e)=> setUserType(e.target.value)} className="text-black block w-full py-2 px-3 pl-10 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" id="usertype" required>
                    <option value={''} disabled selected>Select User Type</option>
                    {
                        userTypes.map((type) =>(
                            <option className='capitalize' value={type} key={type}>{type}</option>
                        ) )
                    }
                    </select>
                </div>
            </div>

            {
                usertype === 'Sale Manager' ? (
                    <>
                        <div className="flex flex-col relative rounded-md shadow-sm">
                            <label className='block text-sm font-medium text-gray-300'>Company/+ies to allot</label>
                            <div className='grid grid-cols-[1fr,1fr,1fr] text-black block w-full py-2 px-4 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500'>
                                <label className='flex items-start cursor-pointer my-1'><input type='checkbox' className='rounded-sm mt-[0.45rem]' name='companies' id='companies' value={'Unique Employment'} /> <span className='ml-2'>Unique Employment</span></label>
                                <label className='flex items-start cursor-pointer my-1'><input type='checkbox' className='rounded-sm mt-[0.45rem]' name='companies' id='companies' value={'Talent Avenue'} /> <span className='ml-2'>Talent Avenue</span></label>
                                <label className='flex items-start cursor-pointer my-1'><input type='checkbox' className='rounded-sm mt-[0.45rem]' name='companies' id='companies' value={'Global HR'} /> <span className='ml-2'>Global HR</span></label>
                                <label className='flex items-start cursor-pointer my-1'><input type='checkbox' className='rounded-sm mt-[0.45rem]' name='companies' id='companies' value={'Perfect HR'} /> <span className='ml-2'>Perfect HR</span></label>
                                <label className='flex items-start cursor-pointer my-1'><input type='checkbox' className='rounded-sm mt-[0.45rem]' name='companies' id='companies' value={'NA Security'} /> <span className='ml-2'>NA Security</span></label>
                                <label className='flex items-start cursor-pointer my-1'><input type='checkbox' className='rounded-sm mt-[0.45rem]' name='companies' id='companies' value={'NA Staffing'} /> <span className='ml-2'>NA Staffing</span></label>
                            </div>  
                        </div>          
                        <div className="flex flex-col relative rounded-md shadow-sm">
                            <label className='block text-sm font-medium text-gray-300'>Head Manager</label>
                            <div className='relative rounded-md shadow-sm '>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Users className='h-5 w-5 text-gray-400'/>
                                </div>
                                <select name="manager" className="text-black block w-full py-2 px-3 pl-10 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" id="manager" required>
                                <option value={''} disabled selected>Select Manager</option>
                                {
                                    managersList && Array.isArray(managersList) ? managersList.map((manager) =>(
                                        <option value={manager.manager_id} key={manager.manager_id}>{manager.name}</option>
                                    ) ): null
                                }
                                </select>
                            </div>    
                        </div>
                    </>      
                ) : (
                    null
                )
            }
            {
                usertype !== 'Sale Manager' && usertype !== '' ? (
                    <>
                        <div className="flex flex-col relative rounded-md shadow-sm">
                            <label className='block text-sm font-medium text-gray-300'>Manager</label>
                            <div className='relative rounded-md shadow-sm '>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Users className='h-5 w-5 text-gray-400'/>
                                </div>
                                <select name="manager" className="text-black block w-full py-2 px-3 pl-10 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" id="manager" required>
                                <option value={''} disabled selected>Select Manager</option>
                                {
                                    managersList && Array.isArray(managersList) ? managersList.map((manager) =>(
                                        <option value={manager.manager_id} key={manager.manager_id}>{manager.name}</option>
                                    ) ): null
                                }
                                </select>
                            </div>    
                        </div>
                        <div className="flex flex-col relative rounded-md shadow-sm">
                            <label className='block text-sm font-medium text-gray-300'>Company Allotted</label>
                            <div className='relative rounded-md shadow-sm '>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Building2 className='h-5 w-5 text-gray-400'/>
                                </div>
                                <select name='assigned' className="text-black block w-full py-2 px-3 pl-10 bg-gray-700  text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" id="gender" required>
                                    <option value={''} disabled selected>Select Option</option>
                                    <option value={'One'}>One</option>
                                    <option value={'Two'}>Two</option>
                                    <option value={'Three'}>Three</option>
                                    <option value={'Four'}>Four</option>
                                    <option value={'Five'}>Five</option>
                                </select>
                            </div>
                        </div>
                    </>
                ):(null)
            }

            <button type="submit" className='w-full flex items-center justify-center rounded-md py-2 bg-emerald-700 text-sm'>
                <UserPlus className='mr-2 h-5 w-5' aria-hidden='true'/>
                Submit
            </button>
        </form>

        </motion.div>

    </div>
  )
}

export default Signin