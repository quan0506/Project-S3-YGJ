// import  { useState, useEffect } from 'react';
import actionTypes from "../../store/actions/actionType"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { processLogout } from '../../store/actions/authAction';
import './Logout.css';
import { Dropdown, Space } from 'antd';
const Logout = () => {
    const currentUser = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {

        try {
            let res = await dispatch(processLogout(currentUser.username));

            if (res.type === actionTypes.LOGOUT_SUCCESS) {
                localStorage.removeItem('cart');
                navigate('/login');
            }
        } catch (err) {
            console.log(err)
        }
    };
    const items = [
        {
            label: (
                <p>Welcome,{currentUser && currentUser.username}</p>
            ),
            key: '0',
        },
        {
            label: (
                <button className='logout-button' onClick={handleLogout}>Logout</button>
            ),
            key: '1',
        },
        {
            label: (
                <Link to='/listOrder'>
                    <button className='check-button' onClick={handleLogout}>Check Order</button>
                </Link>
            ),
            key: '2',
        },
    ];


    return (
        <Dropdown
            menu={{
                items,
            }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <img src='/assets/user.svg' />
                </Space>
            </a>
        </Dropdown>
    );
};

export default Logout;

