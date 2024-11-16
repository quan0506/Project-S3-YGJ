import './CheckOrderPage.css';
import { useParams } from "react-router-dom";
import { FindAllDonHangOfAccount, FindOnDonHangXuLy, updateDonHangXuLy } from "../../Auth/Services/OrderService";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const statusOptions = {
  'Pending': 0,
  'Approved': 1,
  'Rejected': 2,
  'ChuanBiHang': 3,
  'DangGiao': 4,
  'Done': 5,
  'Delete': 6,
  'Huy': 7,
};

const CheckOrderPage = () => {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { id, iddh, idpr } = useParams();
  const account = useSelector(state => state.auth.currentUser);

  const changeStatus = async () => {
    if (currentStatus < Object.keys(statusOptions).length - 1) {
      const newStatus = currentStatus + 1;
      setCurrentStatus(newStatus);
      await updateDonHang(newStatus);
    }
  };

  const updateDonHang = async (newStatus) => {
    try {
      const data = await updateDonHangXuLy(idpr, account.username, newStatus);
      if (data.success) {
        const statusString = Object.keys(statusOptions).find(key => statusOptions[key] === data.content.trangthai);
        if (statusString) {
          setCurrentStatus(statusOptions[statusString]);
        } else {
          console.error('Invalid status received from API:', data.content.trangthai);
        }
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const resetStatus = () => {
    setCurrentStatus(0);
    updateDonHang(0);
  };

  useEffect(() => {
    const getAllSp = async () => {
      try {
        const response = await FindAllDonHangOfAccount(id);
        setProducts(response.content.dataPageList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const getStatus = async () => {
      try {
        const response = await FindOnDonHangXuLy(iddh);
        const statusNumber = statusOptions[response.content.data.trangthai];
        if (statusNumber !== undefined) {
          setCurrentStatus(statusNumber);
        } else {
          console.error('Invalid status received from API:', response.content.data.trangthai);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getStatus();
    getAllSp();
  }, [id, iddh]);

  useEffect(() => {
    const calculateTotal = () => {
      const totalValue = products.reduce((acc, item) => acc + (item.price * item.soluong), 0);
      setTotal(totalValue);
    };

    calculateTotal();
  }, [products]);

  const tax = total * 0.06;
  const amount = total + tax;

  return (
    <div>
      <div className="status-order-container">
        {Object.entries(statusOptions).map(([status, value]) => (
          <div
            key={value}
            className={`status-order-item ${currentStatus >= value ? 'active' : ''}`}
            id={`status${value}`}
          >
            <div className="circle">{value}</div>
            <div className="label">{status}</div>
          </div>
        ))}
      </div>

      <div className="invoice">
        <table>
          <thead>
            <tr>
              <th className='invoice-image'>Image</th>
              <th>Product name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map(item => (
              <tr key={item.id}>
                <td><img src={item.imageUrl} alt={item.product_name} /></td>
                <td>{item.product_name}</td>
                <td>{item.soluong}</td>
                <td>${item.price}</td>
                <td>${item.price * item.soluong}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="invoice-total">
        <div>Total: ${total.toFixed(2)}</div>
        <div>Tax: 6%</div>
        <div>Amount: ${amount.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default CheckOrderPage;
