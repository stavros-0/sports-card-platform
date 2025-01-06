import { Link } from "react-router-dom";


export default function Nav(){
    return(
        <div className="z-[50] fixed top-0 w-full">
            <ul className="flex flex-row gap-2 justify-center ">
                <li>
                    <Link to={`/home`}>Home</Link>
                    
                </li>
                <li>
                    <Link to={`/addcard`}>Add Cards</Link>
                </li>
            </ul>
        </div>
    )
}