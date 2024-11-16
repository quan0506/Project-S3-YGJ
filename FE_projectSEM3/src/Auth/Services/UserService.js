import axios from "../axios";

const getAllUsers = (pageIndex, pageSize) => {
    return axios.get(`api/UserRegMst/FindAll?page=${pageIndex}&pageSize=${pageSize}`, {
    })
}

const getAllRole = () => {
    return axios.get(`api/UserRegMst/FindAllRole`, {
    })
}


const addUser = (data) => {
    return axios.post(`api/UserRegMst/AddAccount`, data, {
    })
}

const deleteUser = (data) => {
    return axios.delete('api/UserRegMst/DeleteAccount', {
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const updateUser = (data) => {
    return axios.put(`api/UserRegMst/EditAccount?id=${data.id}`, data)
}


export {
    getAllUsers,
    deleteUser,
    updateUser,
    addUser,
    getAllRole
}