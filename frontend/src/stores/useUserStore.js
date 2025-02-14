import { create } from 'zustand';

export const useUserStore = create((set,get) => ({
    user:null,
    loading: false,
    error:null,
    checkingAuth: true,
    timer: 0,
    signup: async(data)=>{
        set({loading:true});
        const dataTwo = Object.fromEntries(data.entries());
        dataTwo.companies = [...data.getAll("companies")];
        console.log('Data From User Store=> ',dataTwo)
        try{
            const response = await fetch('http://localhost:4600/new-user',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataTwo),
                credentials: "include",
            })
            if(!response.ok){
                const errorMessage = await response.json()
                console.log(errorMessage)
                set({error: errorMessage, loading: false})
                throw new Error('Failed to submit form, ',response)
            }
            const responseData = await response.json();
            console.log('Success:',responseData)
            set({user: responseData, loading:false})
        }catch(error){
            console.error('Error:',error)
        }
    },
    login:async(data)=>{
        set({loading:true});
        const dataTwo = Object.fromEntries(data.entries()); 
        // console.log('Data From User Store=> ',dataTwo)
        try{
            const response = await fetch('http://localhost:4600/login',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataTwo),
                credentials: "include",
            })
            if(!response.ok){
                console.log(response)
                set({loading:false, error: 'Invalid username or password'})
                throw new Error('Failed to submit form, ',response)
            }
            const responseData = await response.json();
            // console.log('Success:',responseData.token)
            set({user: responseData, loading:false})
        }catch(error){
            console.error('Error:',error)
        }
    },

    checkAuth: async() => {
        set({checkingAuth: true});
        try{
            const response = await fetch('http://localhost:4600/userprofile',{
                method:'GET',
                credentials: "include",
            })

            const responseData = await response.json()

            // console.log('Frontend => ',responseData)
            if(response.ok){
                set({checkingAuth: false, user:responseData})
            }
            
        }catch(error){
            console.error('Error:',error)
            set({checkingAuth: false, user:null})
        }
    },
    timeSpent: async() => {
        set({loading: true})
        const {user} = get()

        if(user){
            // console.log('By using get',user)
            const response = await fetch('http://localhost:4600/agents/timespent',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({agent_id: user?.agent_id})
            })
            const time = await response.json()
            set({timer: time.timer, loading:false})
            // console.log('Timer ==>', time)
        }
    },updateTimer: async(newtime)=> {
        // console.log('Updated Time => ', newtime);
        const {user} = get()
        const response = await fetch('http://localhost:4600/agents/timeupdate',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({agent_id: user?.agent_id, time: newtime})
        })
        if(response.ok){
            set({timer: newtime})
        }
        
    },
    logout: async() => {
        try{
            await fetch('http://localhost:4600/logout',{
                method:'POST',
                credentials: "include",
            })
            set({user: null, timer: 0})
        }
        catch(error){
            console.error('Error:',error)
        }
    }

}))