import axios from "axios"  
import { useState } from "react";
import './GetUser.scss'

function GetUser() {
  const [userArray, setUserArray] = useState<string[]>([]);

  const response = axios.get("http://localhost:3001/app/userList")
  .then(response => setUserArray(response.data))
  
  return (
    <>
      <ul>
        {userArray.map((user, index) => {
          return <li className="userListItem" key={index}>{user}</li>
        })}
      </ul>
    </>
  )
}

export default GetUser