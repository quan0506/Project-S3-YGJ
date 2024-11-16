import axios from '../axios';

const getAllOrders = (pageIndex, pageSize, name = '') => {
    return axios.get(`/api/Order/FindAllDonHangXuLy?name=${name}&page=${pageIndex}&pageSize=${pageSize}`);
};

const getOrdersTotal = () => {
    return axios.get(`/api/Order/TotalMonney`);
};

const FindAllDonHangOfAccount = (id) => {
    return axios.get(`/api/Order/FindAllDonHangOfAccount?id=${id}&page=1&pageSize=200`);
};



const addOrder = (order) => {
    return axios.post('/api/Order/AddOrder', order);
};

const allOrder = (pageIndex, pageSize) => {
    return axios.get(`/api/Order/FindAll?page=1&pageSize=10${name}&page=${pageIndex}&pageSize=${pageSize}`);
}

const addDonHangXuLy = (orders) => {
    return axios.post('/api/Order/AddDonHangXuLy', orders);
};

const AccountByMax = () => {
    return axios.get('/api/Order/AccountByMax');
};

const FindOnDonHangXuLy = (id) => {
    return axios.get(`api/Order/FindOnDonHangXuLy?id=${id}`);
};


const updateDonHangXuLy = async (productId, name, status) => {
    try {
        const params = new URLSearchParams({
            product_id: productId,
            name: name,
            status: status
        });

        const response = await axios.put(`/api/Order/UpdateDonHangXuLy?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
};


const FindOneId = (orderId) => {
    return axios.get(`/api/Order/FindOneId?id=${orderId}`);
};

const RemainProduct = () => {
    return axios.get(`/api/Product/TotalTonKho`);
}

const TotalMoney = () => {
    return axios.get(`/api/Order/TotalMonney`);
}

export {
    getAllOrders,
    addOrder,
    addDonHangXuLy,
    updateDonHangXuLy,
    FindOneId,
    getOrdersTotal,
    RemainProduct,
    AccountByMax,
    TotalMoney,
    allOrder,
    FindAllDonHangOfAccount,
    FindOnDonHangXuLy
};
