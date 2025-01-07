import { Link, useLocation } from "react-router-dom";
import {useState} from "react";

export default function Nav(){
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <>
        <nav className="border-gray-200 dark:bg-gray-800 dark:border-gray-700 md:hidden">
            <div className="relative max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4">
            
            <button onClick={() => setMenuOpen(!menuOpen)} 
                    type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                    area-expanded={menuOpen}>
        
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
            </button>
            {/* Menu Open */}
            <div className={`${menuOpen ? "absolute top-full left-0 w-full flex flex-col items-center justify-center" : "hidden"} bg-gray-50 dark:bg-gray-800 dark:border-gray-700 z-50`} id="navbar-hamburger">
                <ul className="flex flex-col items-center justify-center font-medium rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <li>
                    <Link to={`/home`} className={`text-gray-800 text-lg dark:text-gray-200 mx-1.5 sm:mx-6 ${
                        location.pathname === "/home" ? "border-b-2 border-blue-500 hover:text-current" 
                                                      : "border-b-2 border-transparent hover:border-blue-500 hover:text-current"
                        }`}>Home
                    </Link>
                </li>
                <li>
                    <Link to={`/addcard`} className={`text-gray-800 mt-2 text-lg dark:text-gray-200 mx-1.5 sm:mx-6 ${
                        location.pathname === "/addcard" ? "border-b-2 border-blue-500 hover:text-current" 
                                                         : "border-b-2 border-transparent hover:border-blue-500 hover:text-current"
                        }`}>Add Cards
                    </Link>        
                </li>
                </ul>
                </div>
            </div>
        </nav>
        <nav className="fixed top-0 w-full z-50 bg-gray-900 shadow-md max-md:hidden" >
            <ul className="container flex items-center justify-center p-8 mx-auto text-gray-600 capitalize dark:text-gray-300 bg-gray-900 shadow-md">
                <li>
                    <Link to={`/home`} className={`text-gray-800 text-lg dark:text-gray-200 mx-1.5 sm:mx-6 ${
                        location.pathname === "/home" ? "border-b-2 border-blue-500 hover:text-current" 
                                                      : "border-b-2 border-transparent hover:border-blue-500 hover:text-current"
                        }`}>Home</Link>
                    
                </li>
                <li>
                    <Link to={`/addcard`} className={`text-gray-800 text-lg dark:text-gray-200 mx-1.5 sm:mx-6 ${
                        location.pathname === "/addcard" ? "border-b-2 border-blue-500 hover:text-current" 
                                                         : "border-b-2 border-transparent hover:border-blue-500 hover:text-current"
                        }`}>Add Cards</Link>
                </li>
            </ul>
        </nav>
    </>
    )
}