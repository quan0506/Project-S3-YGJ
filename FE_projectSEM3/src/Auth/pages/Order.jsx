import { useState, useEffect } from 'react';
import { getAllOrders, addOrder } from '../../Auth/Services/OrderService';
import { Table, Modal, Form, Input, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Order.css';

const OrderComponent = () => {
    const [orders, setOrders] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [form] = Form.useForm();
    const account = useSelector(state => state.auth.currentUser);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const result = await getAllOrders(1, 1000, account.username);
            if (result.errorCode === 200) {
                // Sort orders with status other than 'Done' to the top
                const sortedOrders = result.content.data.sort((a, b) => {
                    if (a.trangthai === 'Done' && b.trangthai !== 'Done') return 1;
                    if (a.trangthai !== 'Done' && b.trangthai === 'Done') return -1;
                    return 0;
                });
                setOrders(sortedOrders);
            } else {
                console.log(result.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleAddOrder = async () => {
        try {
            const values = await form.validateFields(); // Validate form fields
            const newOrderData = {
                name: values.name,
                donhang: values.donhang
            };
            await addOrder(newOrderData);
            setShowAddModal(false);
            form.resetFields(); // Reset form fields after successful submission
            fetchOrders();
        } catch (error) {
            console.log(error.message);
        }
    };


    const closeAddModal = () => {
        setShowAddModal(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Code',
            dataIndex: 'product_id',
            key: 'product_id',
        },
        {
            title: 'Name',
            dataIndex: 'account',
            key: 'account',
            render: price => price.toLocaleString(),
        },
        {
            title: 'Phone number',
            dataIndex: 'sodienthoai',
            key: 'sodienthoai',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: total => total.toLocaleString(),
        },
        {
            title: 'Status',
            dataIndex: 'trangthai',
            key: 'trangthai',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Link to={`/system/orderstatus/${record.account_id}/${record.id}/${record.product_id}`}>
                    <img src='/pen.svg' alt='Edit' />
                </Link>
            ),
        },
    ];

    return (
        <div className="order">
            <Row style={{ alignItems: 'center' }}>
                <Col md={21}>
                    <h1>Orders</h1>
                </Col>

            </Row>
            <Table
                columns={columns}
                dataSource={orders}
                rowKey="id"
            />
            <Modal
                title="Add Order"
                open={showAddModal}
                onOk={handleAddOrder}
                onCancel={closeAddModal}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Name"
                        name="name"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Please enter the name!' }]}
                    >
                        <Input size='large' />
                    </Form.Item>

                    <Form.Item
                        label="Order"
                        name="donhang"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Please enter the order!' }]}
                    >
                        <Input size='large' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default OrderComponent;
