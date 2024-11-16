import axios from "./axiosClient"

const getAllRating = (id) => {
    return axios.get(`DanhGia/FindAll?id=${id}&page=1&pageSize=30`)
}
const createRating = (data) => {
    return axios.post(`DanhGia/CreateDanhGia`, data)
}

export {
    getAllRating,
    createRating
}
