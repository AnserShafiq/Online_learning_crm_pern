import { create } from "zustand";


export const useGetData = create((set)=> ({
    loading: false,
    managersList: null,
    companiesList:null,
    manager:null,
    gettingManager: async(managerId,table) => {
        set({loading: true});
        console.log('Data from user=> ', managerId, table)
        try {
            const response = await fetch('http://localhost:4600/managers/details',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json' // Fix: Ensure proper headers
                },
                body: JSON.stringify({managerId,table}),
                credentials: 'include',
            })
            const managerRecv = await response.json()
            console.log(managerRecv)
            set({manager: managerRecv, loading:false})

        } catch (error) {
            console.error(`Unable to get user's manager, `, error)
        }
    },
    gettingManagers: async() => {
        set({loading:true});
        try {
            const response = await fetch('http://localhost:4600/managers/list?type=Sale%20Managers',{
                method:"GET",
                credentials:'include',
            })
            const managers = await response.json()
            console.log('Managers list=> ', managers)
            set({managersList:managers, loading:false})

        } catch (error) {
            console.error('Enable to get managers data: ', error)
        }
    },
    gettingHeadManagers: async() => {
        set({loading:true});
        try {
            const response = await fetch('http://localhost:4600/managers/list?type=Head%20Managers',{
                method:"GET",
                credentials:'include'
            })
            const managers = await response.json()
            console.log('Managers list=> ', managers)
            set({managersList:managers, loading:false})

        } catch (error) {
            console.error('Enable to get managers data: ', error)
        }
    },
    gettingCompanies: async(forUser) => {
        set({loading:true})
        try{
            let response;
            if(forUser === 'HM'){
                response = await fetch('http://localhost:4600/managers/companies?type=HM', {
                    method:"GET",
                    credentials:'include',
                })
            }else if(forUser === 'SM'){
                response = await fetch('http://localhost:4600/managers/companies?type=SM', {
                    method:"GET",
                    credentials:'include',
                })
            }else{
                response = await fetch('http://localhost:4600/agents/companies', {
                    method:"GET",
                    credentials:'include',
                })
            }
            const companies = await response.json()
            console.log('Companies available => ', companies)
            set({companiesList: companies, loading: false})

        }catch(error){
            console.error('Unable to read companies from DB, error => ', error)
        }
    }

}))