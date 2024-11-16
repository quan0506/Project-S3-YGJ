import { useState, useEffect } from 'react';
import { Table, Button, Image, Row, Col } from 'antd';
import { getAllProducts, deleteProduct } from '../Services/ProductService';
import Paging from '../components/paging/paging';
import AddProductModal from './Modal/AddProducts';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './indexadmin.css';

const Products = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const categoryId = ''
    const pageSize = 10
    useEffect(() => {
        fetchProducts();
    }, [currentPage, pageSize]);

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts(currentPage, pageSize);
            if (response && response.errorCode === 200) {
                setProducts(response.content.data);
                setPageCount(response.content.totalPages); // Total pages from response
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            var arrayId = [productId];
            await deleteProduct(arrayId);
            await fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditProduct = (product) => {
        setProductToEdit(product);
        setModalIsOpen(true);
    };

    const openModal = () => {
        setProductToEdit(null);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleChangePage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => ((currentPage - 1) * pageSize) + (index + 1)
        },
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Categories',
            dataIndex: 'category',
            key: 'category',
            render: categories => (
                <ul>
                    {categories.map((cat, idx) => (
                        <li key={idx}>{cat}</li>
                    ))}
                </ul>
            )
        },
        {
            title: 'Images',
            dataIndex: 'image',
            key: 'image',
            width: 200,
            render: images => (
                <Image.PreviewGroup>
                    <Carousel
                        showThumbs={false}
                        showIndicators={false}
                        showArrows={false}
                        infiniteLoop={true}
                        autoPlay={true}
                        interval={1000}
                    >
                        {images.map((img, idx) => (
                            <div key={idx} className="carousel-image-container">
                                <Image
                                    src={img}
                                    alt={`Image ${idx + 1}`}
                                    className="carousel-image"
                                    preview={{ src: img }}
                                />
                            </div>
                        ))}
                    </Carousel>
                </Image.PreviewGroup>
            )
        },
        {
            title: 'Quantity',
            dataIndex: 'soluong',
            key: 'soluong'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div className='icon-delete-pen'>
                    <Button type="link" onClick={() => handleEditProduct(record)}>
                        <img src='/pen.svg' alt="Edit" />
                    </Button>
                    <Button type="link" danger onClick={() => handleDeleteProduct(record.id.toString())}>
                        <img src='/delete.svg' alt="Delete" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div style={{ margin: '30px' }}>
            <Row style={{ alignItems: 'center' }}>
                <Col md={21}>
                    <h1>Products</h1>
                </Col>
                <Col md={2}>
                    <Button
                        style={{ background: 'black' }}
                        type="primary"
                        onClick={openModal}>
                        <i className="fas fa-plus"></i> Add Product
                    </Button>
                </Col>
            </Row>
            <div className='content'>
                <Table
                    dataSource={products}
                    columns={columns}
                    pagination={false}
                    rowKey={record => record.id}
                    bordered
                />
                <AddProductModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    onProductAdded={fetchProducts}
                    productToEdit={productToEdit}
                    categoryId={categoryId}
                />
                {products.length > 0 &&
                    <div style={{ margin: '20px' }}>
                        <Paging
                            pageIndex={currentPage}
                            pageSize={pageSize}
                            pageCount={pageCount}
                            changePage={handleChangePage}
                        />
                    </div>

                }
            </div>
        </div>
    );
};

export default Products;
