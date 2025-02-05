import { create } from "zustand";


export const useGetData = create((set)=> ({
    loading: false,
    managersList: null,

    gettingManagers: async() => {
        set({loading:true});
        try {
            const response = await fetch('http://localhost:4600/managers/list',{
                method:"GET",
                credentials:'include'
            })
            const managers = await response.json()
            console.log('Managers list=> ', managers)
            set({managersList:managers, loading:false})

        } catch (error) {
            console.error('Enable to get managers data: ', error)
        }
    }


}))