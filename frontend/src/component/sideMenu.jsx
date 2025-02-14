import { Lock, Unlock } from "lucide-react"
import { Link } from "react-router-dom"
const SideMenu = () => {

    const sideBooks = [
        {
            name: 'Book One',
            active: true,
        },{
            name:'Book Two',
            active: false,
        },
        {
            name:'Book Three',
            active: false,
        },
        {
            name:'Book Four',
            active: false,
        },
    ]


  return (
    <div className="flex flex-col gap-2 py-10">
        Side Menu
        {
            sideBooks.map((book, index) => 
                <Link className="text-md text-white" key={index}>
                    {book.name} {book.active? (<Unlock />):(<Lock />)}
                </Link>
            )
        }       
    </div>
  )
}

export default SideMenu