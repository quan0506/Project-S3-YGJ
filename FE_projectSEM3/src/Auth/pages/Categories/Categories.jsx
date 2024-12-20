import { useState, useEffect } from 'react';
import {Table, Button, Pagination, Image, Row, Col} from 'antd';
import AddCategoryModal from '../Modal/AddCategory.jsx';
import { getAllCategories, DeleteCategory } from '../../Services/CategoryService.js';

const Categories = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 10
    useEffect(() => {
        fetchCategories();
    }, [currentPage, pageSize]);

    const fetchCategories = async () => {
        try {
            const response = await getAllCategories(currentPage, pageSize);
            if (response && response.errorCode === 200) {
                setCategories(response.content.data);
                setTotal(response.content.totalItems);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await DeleteCategory([categoryId]);
            await fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleEditCategory = (category) => {
        setCategoryToEdit(category);
        setModalIsOpen(true);
    };

    const openModal = () => {
        setCategoryToEdit(null);
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
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <Image style={{ height: 100 ,width:100 , textAlign:'center'}} src={text} alt="Category" />,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <div className='icon-delete-pen'>
                  <Button type="link" onClick={() => handleEditCategory(record)}>
                      <img src='/pen.svg' alt="Edit"/>
                  </Button>

                  <Button type="link" danger onClick={() => handleDeleteCategory(record.id.toString())}>
                      <img src='/delete.svg' alt="Delete"/>
                  </Button>
              </div>
            ),
        },
    ];
    return (
      <div style={{margin:'30px'}}>
          <Row style={{alignItems: 'center'}}>
              <Col md={21}>
                  <h1>Categories</h1>
              </Col>
              <Col md={2}>
                  <Button
                    style={{background:'black'}}
                    type="primary"
                    onClick={openModal}>
                      <i className="fas fa-plus"></i> Add Product
                  </Button>
              </Col>
          </Row>
          <div>
              <Table
                dataSource={categories}
                columns={columns}
                rowKey="id"
                pagination={false}
                bordered
              />
              <div style={{margin:'20px'}}>
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={total}
                    onChange={handleChangePage}
                  />
              </div>

              <AddCategoryModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                onCategoryAdded={fetchCategories}
                categoryToEdit={categoryToEdit}
              />
          </div>
      </div>
    );
};

export default Categories;
