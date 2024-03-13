import { FC, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { IoIosLogOut } from "react-icons/io";
import { IoPlaySkipBackOutline } from "react-icons/io5";

import SideMenuItem from './SideMenuItem';
import SignIn from './Signin';
import SignUp from './SignUp';

import { useAuth } from './Auth';

import './SideMenu.css';




interface SideBarProps {
    data: { path: string; title: string; favic: JSX.Element }[];
    isLogged: boolean;
}

const SideBar: FC<SideBarProps> = ({ data, isLogged }) => {

    const {isLoggedSuccessful} = useAuth();
    const {setIsLoggedSuccessful} = useAuth()   
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const [sidebarOpen, setSidebarOpen] = useState(true);


    const handleLogout = () =>{
        const isLogout = confirm("Do you really won't to Leave")
        if(isLogout){
            sessionStorage.clear();
            setIsLoggedSuccessful(false)
        } 

    }
    const handleIsLogged = () => {
        useEffect(() => {
            const loggedInUser = Object.keys(sessionStorage).find(key => sessionStorage.getItem(key) === "true");
            if(loggedInUser){
                setIsLoggedSuccessful(true);
            }
        }, [])
    }
    handleIsLogged()

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        setSidebarWidth(sidebarOpen ? 70 : 250); 
      };


    const user = Object.keys(sessionStorage).find(key => sessionStorage.getItem(key) === "true");
    return (
        <>
            {isLoggedSuccessful ? (
                    <div className="sideBar" id={`${sidebarOpen ? '' : 'closed'}`} style={{ width: `${sidebarWidth}px` }}>
                    <Link id='homePG' to={"/"}><h1>StudaCh</h1></Link>
                    <IoPlaySkipBackOutline onClick={handleToggleSidebar} id='sliderELem'/>
                    <div className='sideBAr__Items'>
                        <div className='menu'>
                            {data.map((item, index) => (
                                <SideMenuItem key={index} title={item.title} path={item.path} favic={item.favic} isLogged={isLogged} />
                            ))}
                        </div>
                        <div className='LogInOut'>
                            <div className='LoginIcon'>
                                <h1>{user?.toUpperCase()}</h1>  
                            </div>
                            <div id='LogOutBtn' onClick={handleLogout}>
                                <IoIosLogOut size={30}/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            ) : (
                <div className='sideBar' id='sideBar'>
                    <div className='sideBar__elements'>
                        <h1>
                            <Link id='homePG' to={"/"}>StudiFy</Link>
                        </h1>

                        <div className='items'>
                            <div className='LogInOut'>
                                <SignIn />
                                <SignUp />
                            </div>
                        </div>
                    </div>
                    <h1 className='SignMessage'>Hi' Anon, SignIn to get in the forum </h1>
                </div>
            )}
            
        </>
    );
}
export default SideBar;