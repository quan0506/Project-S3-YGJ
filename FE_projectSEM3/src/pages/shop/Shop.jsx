// import  { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import Paging from "../../Auth/components/paging/paging.jsx";
// import Filter from './New/filter/filter.jsx';
// import './shop.css';
// import { getAllProducts, getProductbyName, getProductbyCategory } from '../../Auth/Services/ProductService.js';
// import Loader from '../../components/loader/Loader.jsx';
// import {Row, Col, Rate , Card} from 'antd'
// import {MdOutlineAdd} from "react-icons/md";

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [pageCount, setPageCount] = useState(1);
//   const [filterParams, setFilterParams] = useState({});
//   const { name } = useParams();

//   useEffect(() => {
//     fetchProducts();
//   }, [currentPage, pageSize, filterParams, name]);

//   const fetchProducts = async () => {
//     try {
//       let response;
//       if (name) {
//         response = await getProductbyName(name, currentPage, pageSize);
//       } else {
//         response = await getAllProducts(currentPage, pageSize);
//         if (filterParams.cat) {
//           console.log(filterParams.cat);
//           response = await getProductbyCategory([filterParams.cat.toString()], currentPage, pageSize);
//         }
//       }

//       if (response && response.errorCode === 200) {
//         const shuffledProducts = response.content.data.sort(() => 0.5 - Math.random());
//         setProducts(shuffledProducts);
//         setPageCount(response.content.totalPages);
//       } else {
//         console.error('Failed to fetch products');
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handlePageClick = (pageIndex) => {
//     setCurrentPage(pageIndex);
//   };

//   const handleFilter = (filters) => {
//     setFilterParams(filters);
//   };

//   const handleClearFilters = () => {
//     setFilterParams({});
//     setCurrentPage(1);
//   };

//   useEffect(() => {

//   }, [filterParams]);

//   if (!products) {
//     return <Loader />;
//   }
//   return (
//     <div id='shop'  className='filter'>
//       <h1>Product List</h1>
//       <Row style={{margin:'30px'}}>
//         <Col md={4}>
//           <Filter handleFilter={handleFilter} handleClearFilters={handleClearFilters}/>
//         </Col>
//         <Col md={20}>
//           <div className="shop-products">
//             {products.map((product) => (
//                 <div key={product.id} >
//                   <Card
//                     cover={
//                       <div className="image-wrapper">
//                         <img
//                           className='diamond-image'
//                           alt={product.name}
//                           src={product.image[0]}
//                           height={300}
//                         />
//                         <img
//                           className='diamond-image-hover'
//                           alt={product.name} src={product.image[1]}
//                           height={300}/>
//                         <Link to='/cart'>
//                           <MdOutlineAdd className="add-icon"/>
//                         </Link>

//                       </div>
//                     }
//                     actions={[]}
//                     className="diamond-card shop-card"
//                   >
//                     <Card.Meta
//                       title={
//                         <Link to={`/Product/${product.id}`}>
//                           {product.title}
//                         </Link>
//                       }
//                       description={`${product.price.toLocaleString()}/$`}
//                     />
//                     <div className="diamond-rating">
//                       <Rate disabled defaultValue={5}/>
//                     </div>
//                   </Card>
//                 </div>
//             ))}
//           </div>
//           {products.length > 0 &&
//             <Paging
//               pageIndex={currentPage}
//               pageSize={pageSize}
//               pageCount={pageCount}
//               changePage={handlePageClick}
//             />
//           }
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Shop;
///////////////////////////


import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Paging from "../../Auth/components/paging/paging.jsx";
import Filter from './New/filter/filter.jsx';
import './shop.css';
import { getAllProducts, getProductbyName, getProductbyCategory } from '../../Auth/Services/ProductService.js';
import Loader from '../../components/loader/Loader.jsx';
import { Row, Col, Rate, Card } from 'antd';
import { MdOutlineAdd } from "react-icons/md";
import Footer from '../footer/footer.jsx';

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [filterParams, setFilterParams] = useState({});
  const { name } = useParams();

  useEffect(() => {
    fetchProducts();
  }, [filterParams, name]);

  const fetchProducts = async () => {
    try {
      let response;
      if (name) {
        response = await getProductbyName(name, 1, 1000);  // Lấy tất cả sản phẩm theo tên
      } else {
        if (filterParams.cat) {
          response = await getProductbyCategory([filterParams.cat.toString()], 1, 1000);  // Lấy tất cả sản phẩm theo danh mục
        } else {
          response = await getAllProducts(1, 1000);  // Lấy tất cả sản phẩm
        }
      }

      if (response && response.errorCode === 200) {
        let fetchedProducts = response.content.data;
        if (filterParams.sort === 'asc') {
          fetchedProducts.sort((a, b) => a.price - b.price);
        } else if (filterParams.sort === 'desc') {
          fetchedProducts.sort((a, b) => b.price - a.price);
        }
        setAllProducts(fetchedProducts);
        updatePaginatedProducts(fetchedProducts);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const updatePaginatedProducts = (allProducts) => {
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedProducts = allProducts.slice(startIndex, startIndex + pageSize);
    setProducts(paginatedProducts);
    setPageCount(Math.ceil(allProducts.length / pageSize));
  };

  useEffect(() => {
    updatePaginatedProducts(allProducts);
  }, [currentPage, pageSize, allProducts]);

  const handlePageClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleFilter = (filters) => {
    setFilterParams(filters);
    setCurrentPage(1);  // Reset to the first page whenever filters change
  };

  const handleClearFilters = () => {
    setFilterParams({});
    setCurrentPage(1);
  };

  if (!products) {
    return <Loader />;
  }

  return (
    <>
        <div id='shop' className='filter'>
          <h1>Product List</h1>
          <Row style={{ margin: '30px' }}>
            <Col md={4}>
              <Filter handleFilter={handleFilter} handleClearFilters={handleClearFilters} />
            </Col>
            <Col md={20}>
              <div className="shop-products">
                {products.map((product) => (
                  <div key={product.id}>
                    <Card
                      cover={
                        <div className="image-wrapper">
                          <img
                            className='diamond-image'
                            alt={product.name}
                            src={product.image[0]}
                            height={300}
                          />
                          <img
                            className='diamond-image-hover'
                            alt={product.name} src={product.image[1]}
                            height={300} />
                          <Link to='/cart'>
                            <MdOutlineAdd className="add-icon" />
                          </Link>
                        </div>
                      }
                      actions={[]}
                      className="diamond-card shop-card"
                    >
                      <Card.Meta
                        title={
                          <Link to={`/Product/${product.id}`}>
                            {product.title}
                          </Link>
                        }
                        description={`${product.price.toLocaleString()}/$`}
                      />
                      <div className="diamond-rating">
                        <Rate disabled defaultValue={5} />
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
              {products.length > 0 &&
                <Paging
                  pageIndex={currentPage}
                  pageSize={pageSize}
                  pageCount={pageCount}
                  changePage={handlePageClick}
                />
              }
            </Col>
          </Row>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
