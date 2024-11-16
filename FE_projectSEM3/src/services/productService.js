import axios from "./axiosClient"

const getProductById = (id) => {
    return axios.get(`Product/FindOneId?id=${id}`)
}

const getAllProducts = (pageIndex, pageSize) => {
    return axios.get(`Product/FindAll?account_name=admin&page=${pageIndex}&pageSize=${pageSize}`, {
    })
}


export {
    getProductById,
    getAllProducts
} 