import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  isLoggedSuccessful: boolean;
  setIsLoggedSuccessful: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);



interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedSuccessful, setIsLoggedSuccessful] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedSuccessful, setIsLoggedSuccessful }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
};







// let isLoggedSuccessful = false

// interface AuthContextProps {
//     isLogged: boolean;
//     setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
// }
// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider : React.FC = ({children}) => {
//     const [isLogged, setIsLogged] = useState<boolean>(false);

//     return (
//         <AuthContext.Provider value={{isLogged, setIsLogged}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }
// export const useAuth  = () : AuthContextProps => {
//     const context = useContext(AuthContext);    
//     if(!context){
//         throw new Error("Error")
//     }
//     return context
// }

// const signIn = async (user:string, pass : string) =>{
//     try{
//         const response = await axios.post('http://localhost:3001/app/login', {user, pass}, {
//         headers: {
//           'Content-Type' : 'application/json'
//         }
//         })
//         const isLoggedSuccessful = response.data.success;

//         return isLoggedSuccessful
//     } catch(e){
//         console.error("Error during sign in", e);
//         return false;
//     }
// }
// export default signIn