import { Link, useLocation } from "react-router-dom";


export default function Nav(){
    const location = useLocation();

    return(
        <nav className="z-[50] fixed top-0 w-full bg-white shadow dark:bg-gray-800" >
            <ul className="container flex items-center justify-center p-8 mx-auto text-gray-600 capitalize dark:text-gray-300">
                <li>
                    <Link to={`/home`} className={`text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6 ${
                        location.pathname === "/home" ? "border-b-2 border-blue-500 hover:text-current" 
                                                      : "border-b-2 border-transparent hover:border-blue-500 hover:text-current"
                        }`}>Home</Link>
                    
                </li>
                <li>
                    <Link to={`/addcard`} className={`text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6 ${
                        location.pathname === "/addcard" ? "border-b-2 border-blue-500 hover:text-current" 
                                                         : "border-b-2 border-transparent hover:border-blue-500 hover:text-current"
                        }`}>Add Cards</Link>
                </li>
            </ul>
        </nav>
    )
}