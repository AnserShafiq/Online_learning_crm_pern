import { ChevronRight, Lock } from "lucide-react"
import { Link } from "react-router-dom"
import { useUserStore } from "../stores/useUserStore"
const SideMenu = () => {
    const {timer} = useUserStore()
    const sideBooks = [
        {
            name: 'Book One',
            active: true,
            link: '/user/dashboard',
            completed: false,
        },{
            name:'Book Two',
            active: timer > 1200 ? true : false ,
            link: '/user/dashboard/lecture-two',
            timelimit: 1200,
            completed: false,
        },
        {
            name:'Book Three',
            active: timer > 2400  ? true : false,
            link: '/user/dashboard/lecture-three',
            timelimit: 2400,
            completed: false,
        },
        {
            name:'Book Four',
            active: timer > 3000 ? true : false,
            link: '/user/dashboard/lecture-four',
            timelimit: 3000,
            completed: false,
        },
    ]

  return (
    <div className="flex flex-col gap-2 py-10 w-full overflow-x-auto">
        <h3 className="text-xl capitalize underline underline-offset-4 mb-6">Book options</h3>
        <div className="px-3">
        {
            sideBooks.map((book, index) => 
                <Link to={book.active ? book.link : null} className={`text-md flex justify-between items-center mb-3 text-white ${book.active ? 'cursor-pointer':'cursor-no-drop'}`} key={index}>
                    {book.name} {book.active? (
                        <div className=" flex flex-col-reverse items-center">
                            <ChevronRight className="h-4 text-gray-100 mt-1" />
                        </div>
                        
                    ):(
                        
                        <div className="text-[10px] flex flex-row items-center ">
                            {Math.floor((book.timelimit - timer)/3600)}h {Math.floor(((book.timelimit - timer)%3600)/60)}m <Lock className="h-4 ml-1 text-orange-800" />
                        </div>
                        
                        )}
                </Link>
            )
        }    
        </div>       
    </div>
  )
}

export default SideMenu