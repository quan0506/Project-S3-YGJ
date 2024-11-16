import axios from "./axiosClient"

const addProcessOrder = (data) => {
    return axios.post(`Order/AddDonHangXuLy`, data)
}


export {
    addProcessOrder,
} 