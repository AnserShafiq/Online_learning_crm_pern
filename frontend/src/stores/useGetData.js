import { create } from "zustand";


export const useGetData = create((set)=> ({
    loading: false,
    managersList: null,
    companiesList:null,

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
    gettingCompanies: async() => {
        set({loading:true})
        try{
            const response = await fetch('http://localhost:4600/managers/companies', {
                method:"GET",
                credentials:'include',
            })
            const companies = await response.json()
            console.log('Companies available => ', companies)
            set({companiesList: companies, loading: false})

        }catch(error){
            console.error('Unable to read companies from DB, error => ', error)
        }
    }

}))