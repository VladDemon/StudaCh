import React from 'react';

import './Profile.scss';


interface StudiesProps {}

const Studies: React.FC<StudiesProps> = () => {
  // const [data, setData] = useState<string | null>(null);
  // const user = sessionStorage.key(0)


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post('http://localhost:3001/app/login', { user, pass }, {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       })
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <div className='studies'>
        <header>
        <h1>Dashboard</h1>
          <div className='header__info'>
            <a id='someText' href="">SomeText</a>
            <a id='about' href="">About</a>
          </div>
        </header>

        <main>
          <div className="main__countMessages">
            <h1>0 ms</h1>
          </div>
          <div className="main__timeInForum">
            <h1>0 hr</h1>
          </div>
          <div className="main__dataOfActive"> 
            <h1>DataBase</h1>
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