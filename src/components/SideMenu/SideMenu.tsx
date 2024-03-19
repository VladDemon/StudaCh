import { FC, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { IoIosLogOut } from "react-icons/io";
import { IoPlaySkipBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

import SideMenuItem from './SideMenuItem';
import SignIn from './Signin';
import SignUp from './SignUp';

import { useAuth } from './Auth';

import './SideMenu.css';

import axios from 'axios';



interface SideBarProps {
    data: { path: string; title: string; favic: JSX.Element }[];
    isLogged: boolean;
}

const SideBar: FC<SideBarProps> = ({ data, isLogged }) => {
    const navigate = useNavigate();
    const {isLoggedSuccessful} = useAuth();
    const {setIsLoggedSuccessful} = useAuth()   
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [login, setLogin] = useState<string | null>(null);


    // useEffect(() => {
    //     const checkAuthentication = async () => {
    //         const getSessionId = localStorage.getItem("sessionId");
    //         try {
    //             const response = await axios.post('http://localhost:3001/app/authenticated', {getSessionId}, {
    //                 headers: {"Content-Type" : "application/json"}
    //             });
    //             console.log(response.data.authenticated);
    //             setIsAuthenticated(response.data.authenticated);
    //             setLogin(response.data.user);
    //         } catch (error) {
    //             console.error('Error checking authentication status:', error);
    //         }
    //     };

    //     checkAuthentication();
    // }, []);

    // пороверка аунтификации для сессии
    // const handleIsLogged = () => {
    //     useEffect(() => {
    //         const checkAuthentication = async () => {
    //             try {
    //                 const response = await axios.get('http://localhost:3001/app/authenticated');
    //                 setIsAuthenticated(response.data.authenticated);
    //                 setLogin(response.data.user);
    //                 if (response.data.authenticated) {
    //                     setIsLoggedSuccessful(true);
    //                 }
    //             } catch (error) {
    //                 console.error('Error checking authentication status:', error);
    //             }
    //         };
    
    //         checkAuthentication();
    //     }, []);
    // };

    const handleLogout = async() =>{
        const response = await axios.post('http://localhost:3001/app/logout');
        const isLogout = confirm("Do you really won't to Leave")
        if(isLogout && response.data.success){
            localStorage.clear();
            setIsLoggedSuccessful(false)
            navigate('/');
        }else {
            console.log('Logout failed:', response.data.message);
        }

    }
    const handleIsLogged = () => {
        useEffect(() => {
            const loggedInUser = Object.keys(localStorage).find(key => localStorage.getItem(key) === "true");
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


    const user = Object.keys(localStorage).find(key => localStorage.getItem(key) === "true");
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