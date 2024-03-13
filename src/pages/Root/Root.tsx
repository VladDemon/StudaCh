import { Outlet } from 'react-router-dom'

// import { MdOutlinePlayLesson } from "react-icons/md";
import { CiChat1 } from "react-icons/ci";
import { AiOutlineTeam } from "react-icons/ai";
import { PiTwitchLogoDuotone } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi";
import { RiProfileLine } from "react-icons/ri";

import SideMenu from '../../components/SideMenu/SideMenu';

import './Root.scss'
import '../UserWindow.css'
import { useState } from 'react';

const UserDat = [
    {
        title: "Profile",
        path: "pages/Studies",
        favic: <RiProfileLine style={{ color:"white", height:"2.5rem"}}/>
    },
    {
        title: "Chat",
        path: "pages/Chat",
        favic: <CiChat1 style={{ color:"white", height:"2.5rem"}}/>
    },
    {
        title: "Teaming",
        path: "pages/Teaming",
        favic: <AiOutlineTeam style={{ color:"white", height:"2.5rem"}}/>
    },
    {
        title: "Stream",
        path: "pages/stream",
        favic: <PiTwitchLogoDuotone style={{ color:"white", height:"2.5rem"}}/>
    },
    {
        title: "Users",
        path: "pages/Users",
        favic: <HiOutlineUsers style={{ color:"white", height:"2.5rem"}}/>
    }
]
const ImgSources = [
    '/public/images/dance9mm.gif',
    '/public/images/bgImg3.gif',
]

const Root = () => {
    const [curImg, setCurImg] = useState(0);
    
    const handleImgSources = () =>{
        const Img = (curImg + 1) % ImgSources.length
        setCurImg(Img)
    }
    return(
        <div className='userWindow'>
            <SideMenu isLogged data={UserDat}/>
            <div id='outlet'>
                <Outlet/>
                <div className='GifImg'>
                    <img onClick={handleImgSources} id='GifImg_id' src={ImgSources[curImg]} alt="GifImg"  width={120} data-img="Click on me" title='Click On me'/>
                </div>
            </div>
        </div>

    )
}

export default Root