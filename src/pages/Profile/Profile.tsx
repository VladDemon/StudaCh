import React from 'react';
import axios from 'axios';
import './Profile.scss';
import { useState } from 'react';

interface StudiesProps {}

const Studies: React.FC<StudiesProps> = () => {
  // const [countMsg, setCountMsg] = useState<number>(0)
  // const [timeInForum, setTimeInForum] = useState<number>(0);


  // const hadnleCountMsg =() => {
  //   axios.get('http://localhost:3001/app/')
  //   .then(res => {
  //     setCountMsg(res.data)
  //   })
  // }
  // }
  return (
    <>
      <div className='studies'>
        <header>
        <h1>Dashboard</h1>
          <div className='header__info'>
            <a id='about' href="">About</a>
            <span className="about__description">Свобода, учеба, общение.<br></br> БОРДУ НЕ ТРЕМЬ И НЕ ШАТАЕМ!!!!</span>
          </div>
        </header>

        <main>
          <div className="main__countMessages">
            <h1>0 ms</h1>
          </div>
          <div className="main__timeInForum">
            <h1>0 hr</h1>
          </div>
          <div className="main__ChangeData"> 
            <h1>Change data</h1>
            <form id='changeData' action="">
              <label id='changeData' htmlFor="">
                <div className="changeData__input">
                  <input placeholder='login' type="text" />
                  <input placeholder='past password' type="password" />
                  <input placeholder='new password' type="password" />
                </div>
                <button id='changeData__input__btn' type="submit">Change</button>
              </label>
            </form>
          </div>
          <div className="main__dataOfActive">
            <h1>Admin Section or Standard User</h1>
          </div>
        </main>



        
        
        {/* <form action="">
          <label className='studies__label' 
          style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
          >
            <h1>Login</h1>
            <h1>Password</h1>
            <input type="text" placeholder='Login' />
            <input type="password" placeholder='Password' />
            <button type="submit">Login</button>
          </label>
        </form> */}
        {/* <h1>
          {data === null ? "Loading" : data}
        </h1> */}
      </div>
    </>
  );
}

export default Studies;