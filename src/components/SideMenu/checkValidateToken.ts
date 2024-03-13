import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json",
    },
});


export const checkValidateToken = async () => {
    try {
        const response = await api.get('/app/profile', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }})
        console.log(response.data);
        return response.data.success; 
      } catch (e){
        console.error(e);
        return false;
      }
}