// Axios
import Axios from "./APIUtils"

export const loginUser = (email) => {
    return new Promise((resolve, reject) => {
        const data = Axios.post(`/users/login`, {
            email: email
        })
        setTimeout(() => resolve(data), 0)
    })

}