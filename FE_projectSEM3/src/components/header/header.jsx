
import { useEffect, useState } from 'react';
import './header.css';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GrMapLocation } from "react-icons/gr";
import { PiPhoneTransferLight } from "react-icons/pi";
import { Col, Row} from "antd";
import Logout from "../../pages/Logout/Logout.jsx";
import { useSelector } from 'react-redux';
const Header = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogined = useSelector(state => state.auth.isLoggedIn);
  const [loginStatus, setLoginStatus] = useState(isLogined);
  const toggleSearchBar = () => {
    setSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };
  useEffect(() => {
    setLoginStatus(isLogined);
  }, [isLogined]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword) {
      navigate(`/shop/${searchKeyword}`);
    } else {
      navigate(`/shop`);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };
  const isActive = (path) => location.pathname === path ? 'active' : '';


  return (
    <>
      <Row className={`header ${isScrolled ? 'background' : ''}`}>
        <Col span={24}>
          <div className="headerAlt">
            <div className='icon-header-item'>
              <div className='icon-header'>
                <img src='/location-pin-alt-1-svgrepo-com.svg' alt="location_icon" width={35} height={35} />
                Store Location
              </div>
              <div className='icon-header'>
                <img src='/telephone-svgrepo-com.svg' alt="hotline_icon" width={30} height={30}/>
                0338 69 54 56
              </div>
            </div>
            <div>
              <img src='/logo-page.png' width={200}/>
            </div>
            <div className="header-img-icom">
              {loginStatus ? (
                <Logout />
              ) : (
                <Link className="p-2 support-item" to='/login'>
                  <img src='/user-alt-1-svgrepo-com.svg' alt="user_icon" width={38} height={38}/>
                </Link>
              )}
              <img src='/search-svgrepo-com.svg' alt="search_icon" width={38} height={38} onClick={toggleSearchBar}/>
              <Link to='/cart' className=" support-item">
                <img src='/cart-1-svgrepo-com.svg' alt="cart_icon" width={38} height={38}/>
              </Link>
            </div>
          </div>
        </Col>
        <Col span={24} className="headerSection">
          <div className="headerBottom">
            <div className="headerBottom-middle">
              <Link to='/' className={`nav-link ${isActive('/')}`}>
                <p>Home</p>
              </Link>
              <Link to='/shop' className={`nav-link ${isActive('/shop')}`}>
                <p>Shop</p>
              </Link>
              <Link to='/about' className={`nav-link ${isActive('/about')}`}>
                <p>About Us</p>
              </Link>
              <Link to='/contact' className={`nav-link ${isActive('/contact')}`}>
                <p>Contact Us</p>
              </Link>
              <Link to='/blog' className={`nav-link ${isActive('/blog')}`}>
                <p>Blog</p>
              </Link>
            </div>
          </div>
          <div className={`search-bar ${isSearchVisible ? 'show' : ''}`}>
            <SearchOutlined onClick={handleSearch} className="search-icon" />
            <input
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="SEARCH..."
              className="search-input" />
            <CloseOutlined className="close-icon" onClick={toggleSearchBar} />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Header;
