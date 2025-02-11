import {motion} from 'framer-motion'
import { useEffect, useRef, useState } from 'react';
import {Building2, Eye, EyeOff, LockKeyholeOpen, Mail, Shapes, User, UserPlus, Users} from 'lucide-react'
import { useUserStore } from '../stores/useUserStore.js'
import { useGetData } from '../stores/useGetData.js';
const Signin = () => {
    const {
        managersList,
        companiesList, 
        gettingManagers, 
        gettingHeadManagers, 
        gettingCompanies
    } = useGetData();

    const passOneRef = useRef(null)
    const passTwoRef = useRef(null)
    const [showPassOne, setShowPassOne] = useState(false);
    const [showPassTwo, setShowPassTwo] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState(false)
    const [usertype, setUserType] = useState('')
    const {signup, error} = useUserStore();

    useEffect(()=> {
        if(usertype === 'Head Manager'){
            gettingCompanies('HM')
        }else if(usertype === 'Sale Manager'){
            gettingHeadManagers()
            gettingCompanies('SM')
        }else{
            gettingManagers()
            gettingCompanies();
        }
    },
    [gettingManagers,gettingHeadManagers, usertype,gettingCompanies])
    const userTypes = [
        'Sale Agent',
        'Head Manager',
        'Sale Manager',
        'Graphic Designer',
        'Accountant',
        'Clerk'
    ]
    const handlePassword = async(e) => {
        e.preventDefault();
        if(passOneRef.current.value !== passTwoRef.current.value){
            setPasswordCheck(true)
        }
        else{
            setPasswordCheck(false)
        }
    }
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
                
                <label className='block text-sm font-medium text-gray-300'>User&apos;s Name</label>
                <div className='relative rounded-md shadow-sm '>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <User className='h-5 w-5 text-gray-400'/>
                    </div>
                    <input className="text-black block w-full py-2 px-3 pl-10 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" type='text' placeholder="User's Name..." name='name' id='name' required/>
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
                { error !==null && error.reason === 'Email' && <h3 className='text-md text-red-500 mt-1'>{error.message}</h3>}
            </div>

            <div className="flex flex-col relative rounded-md shadow-sm">
                <label className='block text-sm font-medium text-gray-300'>Password</label>
                <div className='relative rounded-md shadow-sm '>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <LockKeyholeOpen className='h-5 w-5 text-gray-400'/>
                    </div>
                    <input ref={passOneRef} className="text-black block w-full py-2 px-3 pl-10 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" 
                    type={showPassOne ? 'text':'password'} placeholder="Password..." name='password' id='password' required/>
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events'>
                    {
                        !showPassOne ? (<EyeOff className='h-5 text-gray-400 cursor-pointer' onClick={() => setShowPassOne(true)}/>):(<Eye className='h-5 text-gray-400 cursor-pointer' onClick={() => setShowPassOne(false)} />)
                    }
                    </div>
                </div>
                
            </div>
            <div className="flex flex-col relative rounded-md shadow-sm">
                <label className='block text-sm font-medium text-gray-300'>Re-type Password</label>
                <div className='relative rounded-md shadow-sm '>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <LockKeyholeOpen className='h-5 w-5 text-gray-400'/>
                    </div>
                    <input onChange={handlePassword} ref={passTwoRef} 
                    className="text-black block w-full py-2 px-3 pl-10 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" 
                    type={showPassTwo ? 'text':'password'} placeholder="Password..." name='re-password' id='re-password' required/>
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events'>
                    {
                        !showPassTwo ? (<EyeOff className='h-5 text-gray-400 cursor-pointer' onClick={() => setShowPassTwo(true)}/>):(<Eye className='h-5 text-gray-400 cursor-pointer' onClick={() => setShowPassTwo(false)} />)
                    }
                    </div>
                </div>
                {passwordCheck && <h3 className='text-sm text-red-500'>Password is not valid</h3>}
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
                usertype === 'Head Manager' ? (
                    <>
                        <div className="flex flex-col relative rounded-md shadow-sm">
                            <label className='block text-sm font-medium text-gray-300'>Contact Number</label>
                            <div className='relative rounded-md shadow-sm '>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <LockKeyholeOpen className='h-5 w-5 text-gray-400'/>
                                </div>
                                <input className="text-black block w-full py-2 px-3 pl-10 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" type='tel' placeholder="Contact number..." name='contact_number' id='contact_number' required/>
                            </div>
                            
                        </div>          
                    </>      
                ) : (
                    null
                )
            }
            {
                usertype !== 'Head Manager' && usertype !== '' ? (
                    <>
                        <div className="flex flex-col relative rounded-md shadow-sm">
                            <label className='block text-sm font-medium text-gray-300'>Manager</label>
                            <div className='relative rounded-md shadow-sm '>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Users className='h-5 w-5 text-gray-400'/>
                                </div>
                                <select name="manager" className="text-black block w-full py-2 px-3 pl-10 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" id="manager" required>
                                <option value={''} key={'null'} disabled selected>Select Manager</option>
                                {
                                    managersList && Array.isArray(managersList) ? managersList.map((manager,index) =>(
                                        <option key={index} value={manager.agent_id} >{manager.name}</option>
                                    ) ): null
                                }
                                </select>
                            </div>    
                        </div>
                    </>
                ):(null)
            }
            {
                usertype !== 'Head Manager' && usertype !== 'Sale Manager' && usertype !== '' ? (
                    <div className="flex flex-col relative rounded-md shadow-sm">
                        <label className='block text-sm font-medium text-gray-300'>Company To Allot</label>
                        <div className='relative rounded-md shadow-sm '>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Building2 className='h-5 w-5 text-gray-400'/>
                            </div>
                            <select name='assigned' className="text-black block w-full py-2 px-3 pl-10 bg-gray-700  text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md shadow-md mt-1 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500" id="assigned" >
                                <option value={''} disabled selected>Select Option</option>
                                {
                                    Array.isArray(companiesList) && companiesList.length > 0 ? (
                                        companiesList.map((company, index) => 
                                            <option key={index} value={company.company_id}>{company.name}</option>
                                        )
                                    ):(
                                        <h3>No company in option</h3>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                ):(null)
            }
            {
                usertype ==='Head Manager' || usertype === 'Sale Manager' ? (
                    <div className="flex flex-col relative rounded-md shadow-sm">
                        <label className='block text-sm font-medium text-gray-300'>Company/+ies to allot</label>
                        <div className='w-full py-2 px-4 bg-gray-700 rounded-md shadow-md mt-1'>
                            {
                                    Array.isArray(companiesList) && companiesList.length >0 ? (
                                    <div className='grid grid-cols-[1fr,1fr,1fr] text-gray-200 w-full'>
                                        {companiesList.map((company) => (

                                        <label key={company.company_id} className='flex items-start cursor-pointer my-1'>
                                            <input type='checkbox' className='rounded-sm mt-[0.45rem]' name='companies' id={company.company_id} value={company.company_id} /> 
                                            <span className='ml-2'>
                                                {company.name}
                                            </span>
                                        </label>        
                                        ))}
                                    </div>
                                    ):(
                                    <h3 className=' text-gray-400'>No Company Available</h3>
                                )
                            }
                        </div>  
                    </div>
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