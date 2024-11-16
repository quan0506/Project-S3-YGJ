import { useState, useEffect } from 'react';
import { Table, Button, Pagination, Image, Row, Col } from 'antd';
import AddCustomerModal from "./Modal/AddCustomer";
import { getAllUsers, deleteUser, updateUser, addUser } from '../Services/UserService.js';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './indexadmin.css';


const Customers = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerToEdit, setCustomerToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetchCustomers();
  }, [currentPage, pageSize]);

  const fetchCustomers = async () => {
    try {
      const response = await getAllUsers(currentPage, pageSize);
      if (response && response.errorCode === 200) {
        setCustomers(response.content.data);
        setTotal(response.content.totalItems);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await deleteUser([customerId]);
      await fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEditCustomer = (customer) => {
    setCustomerToEdit(customer);
    setModalIsOpen(true);
  };

  const openModal = () => {
    setCustomerToEdit(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <Image style={{ height: 100, width: 100, textAlign: 'center' }} src={text} alt="Customer" />,
    },
    {
      title: 'IsActive',
      dataIndex: 'action',
      key: 'action',
      render: (isActive) => (isActive == "Action" ? 'true' : 'false'),
    },
    {
      title: 'Action',
      key: 'actionz',
      render: (_, record) => (
        <div className='icon-delete-pen'>
          <Button type="link" onClick={() => handleEditCustomer(record)}>
            <img src='/pen.svg' alt="Edit" />
          </Button>

          <Button type="link" danger onClick={() => handleDeleteCustomer(record.id.toString())}>
            <img src='/delete.svg' alt="Delete" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ margin: '30px' }}>
      <Row style={{ alignItems: 'center' }}>
        <Col md={21}>
          <h1>Customers</h1>
        </Col>
        <Col md={2}>
          <Button
            style={{ background: 'black' }}
            type="primary"
            onClick={openModal}>
            <i className="fas fa-plus"></i> Add Customer
          </Button>
        </Col>
      </Row>
      <div>
        <Table
          dataSource={customers}
          columns={columns}
          rowKey="id"
          pagination={false}
          bordered
        />
        <div style={{ margin: '20px' }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={handleChangePage}
          />
        </div>

        <AddCustomerModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onCustomerAdded={fetchCustomers}
          customerToEdit={customerToEdit}
        />
      </div>
    </div>
  );
};

export default Customers;
