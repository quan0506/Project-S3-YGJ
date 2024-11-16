import { useState, useEffect } from 'react';
import './productDetail.css';
import { Link, useParams } from "react-router-dom";
import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getProductById } from "../../../../services/productService";
import Loader from '../../../../components/loader/Loader';
import AddToCartButton from '../../../../components/addToCart/addToCart';
import { FaChevronLeft, FaChevronRight, FaPlus, FaMinus } from "react-icons/fa";
import { Select, Rate } from 'antd';
const { Option } = Select;
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import CommentSection from "../../Comment/CommentSection";
import RateSection from "../Comment/RateSection";
import { getAllRating } from "../../../../services/rateService";
import Footer from '../../../footer/footer.jsx';

const ProductDetail = () => {
  const [ratingAvg, setRatingAvg] = useState(0);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("https://via.placeholder.com/300");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        if (response && response.errorCode === 200) {
          setProduct(response.content);
          if (response.content.image && response.content.image.length > 0) {
            setMainImage(response.content.image[0]);
          }
        } else {
          console.error('Failed to fetch product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    const findAllRating = async () => {
      try {
        const data = await getAllRating(id, 1, 1);
        setRatingAvg(data.content.totalSao)
      } catch (error) {
        console.error("Failed to fetch ratings:", error);
      }
    };

    findAllRating();
    fetchProduct();
  }, [id]);


  const changeImageWithTransition = (newImageIndex) => {
    const mainImageElement = document.querySelector('.main-image');
    mainImageElement.classList.add('fade-out');

    setTimeout(() => {
      setMainImage(product.image[newImageIndex]);
      setCurrentImageIndex(newImageIndex);
      mainImageElement.classList.remove('fade-out');
    }, 500);
  };

  const handleNextImage = () => {
    if (product.image && product.image.length > 0) {
      const newIndex = (currentImageIndex + 1) % product.image.length;
      changeImageWithTransition(newIndex);
    }
  };

  const handlePrevImage = () => {
    if (product.image && product.image.length > 0) {
      const newIndex = (currentImageIndex - 1 + product.image.length) % product.image.length;
      changeImageWithTransition(newIndex);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (!product) {
    return <Loader />;
  }
  return (
    <>
      <div id='detail'>
        <Row className='producDetail'>
          <Col md={6} className="product-images">
            <div className="image-containers">
              <span className="prev-button" onClick={handlePrevImage}><FaChevronLeft /></span>
              <img
                src={mainImage}
                alt="Product"
                className="main-image"
              />

              <span className="next-button" onClick={handleNextImage}><FaChevronRight /></span>
            </div>
            <div className="thumbnail-images">
              {product.image && product.image.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => {
                    changeImageWithTransition(index);
                  }}
                  style={{ cursor: 'pointer' }}
                  className={currentImageIndex === index ? 'selected-thumbnail' : ''}
                />
              ))}
            </div>
          </Col>
          <Col md={6} className="product-info">
            <h1>{product.title}</h1>
            <div className="rating">
              <Rate disabled value={ratingAvg} />
            </div>
            <div className="price">${product.price}</div>
            <p className="description"><strong>Description:</strong> {product.description}</p>
            <div className="details">
              <p><strong>Type:</strong> {product.category.join(', ')}</p>
            </div>
            <div className="option">
              <Form.Group controlId="quantityInput">
                <Form.Label>Quantity:</Form.Label>
                <InputGroup>
                  <Button variant="outline-secondary" onClick={() => handleQuantityChange(quantity - 1)}>
                    <FaMinus />
                  </Button>
                  <Form.Control
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    className="text-center"
                  />
                  <Button variant="outline-secondary" onClick={() => handleQuantityChange(quantity + 1)}>
                    <FaPlus />
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label>Size:</Form.Label>
                <Select
                  placeholder="Choose Size"
                  optionFilterProp="children"
                  style={{ width: '100%', height: '40px' }}
                >
                  <Option value="1">Jack</Option>
                  <Option value="2">Lucy</Option>
                  <Option value="3">Tom</Option>
                </Select>
              </Form.Group>
            </div>
            <div className="actions">
              <Link to='/checkout'>
                <button className="buy-now">BUY NOW</button>
              </Link>
              <Link to='/cart'>
                <AddToCartButton item={product} className="add-to-cart" quantity={quantity} />
              </Link>
            </div>
          </Col>
        </Row>
        <RateSection productId={Number(id)} />
        {/* <div>
          <CommentSection productId={Number(id)} />
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
