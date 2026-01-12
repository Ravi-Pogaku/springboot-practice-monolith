import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useLogout = () => {
    const axios = useAxios()
    const { setAuth } = useAuth()

    const logout = async () => {
        try {
            const res = await axios.post('/auth/logout')
            
            console.log("LOGGING OUT")
            console.log(res.data)

            setAuth(null)
        } catch (err) {
            console.error("ERROR DURING LOGOUT ", err)
        }
    }

    return { logout }
}

export default useLogout