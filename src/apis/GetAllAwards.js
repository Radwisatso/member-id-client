// Axios
import Axios from "./APIUtils"

export const getAllAwards = (type = null, initialPoint) => {
    return new Promise((resolve, reject) => {
        const data = Axios.get(`/awards`, {
            params: {
                awardTypes: type,
                initialPoint: initialPoint
            }
        })
        setTimeout(() => resolve(data), 0)
    })

}