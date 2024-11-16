import React, { useState, useEffect } from 'react';
import { FindAllDonHangOfAccount } from '../../../Auth/Services/OrderService';
import { Modal, Button, Form, Input, Alert, Tabs, Card, Row, Col, Typography, Tag, Divider, Avatar, Image, Empty } from 'antd';
import { useSelector } from 'react-redux';
import { ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './ListOrder.css';
import { Link } from 'react-router-dom';

const { Search } = Input;
const { Text, Title } = Typography;
const { TabPane } = Tabs;

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("1"); // State to track active tab
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const account = useSelector(state => state.auth.currentUser);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const result = await FindAllDonHangOfAccount(account.id);
            if (result.errorCode === 200) {
                setOrders(result.content.dataPageList);
            } else {
                console.log(result.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const handleSearch = value => {
        setHasSearched(true);
        const trimmedValue = value.trim();
        setSearchTerm(trimmedValue);
        if (trimmedValue) {
            const filteredOrders = orders.filter(order =>
              order.product_name.toLowerCase().includes(trimmedValue.toLowerCase()) ||
              order.id.toString().includes(trimmedValue)
            );
            setSearchResults(filteredOrders);
        } else {
            setSearchResults([]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchTerm);
        }
    };

    const getFilteredOrders = () => {
        if (activeTab === "1") {
            return hasSearched ? searchResults : orders;
        }
        return orders.filter(order => {
            switch (activeTab) {
                case "3": return order.trangthai === 'Pending';
                case "4": return order.trangthai === 'Approved';
                case "5": return order.trangthai === 'Rejected';
                case "6": return order.trangthai === 'Preparing goods';
                case "7": return order.trangthai === 'Shipping';
                case "8": return order.trangthai === 'Done';
                default: return true;
            }
        });
    };

    return (
      <div style={{ background: '#f5f5f5', paddingBottom: '20px' }}>
          <div id="list-order">
              <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                  <TabPane tab="All Orders" key="1">
                      {activeTab === "1" && (
                        <Search
                          placeholder="You can search by Product name"
                          enterButton
                          size="large"
                          value={searchTerm}
                          onChange={e => setSearchTerm(e.target.value)}
                          onSearch={handleSearch}
                          onKeyDown={handleKeyDown}
                          suffix={<div />}
                        />
                      )}
                      <OrderList orders={getFilteredOrders()} hasSearched={hasSearched} />
                  </TabPane>
                  <TabPane tab="Pending" key="3">
                      <OrderList orders={getFilteredOrders()} />
                  </TabPane>
                  <TabPane tab="Approved" key="4">
                      <OrderList orders={getFilteredOrders()} />
                  </TabPane>
                  <TabPane tab="Rejected" key="5">
                      <OrderList orders={getFilteredOrders()} />
                  </TabPane>
                  <TabPane tab="Preparing goods" key="6">
                      <OrderList orders={getFilteredOrders()} />
                  </TabPane>
                  <TabPane tab="Shipping" key="7">
                      <OrderList orders={getFilteredOrders()} />
                  </TabPane>
                  <TabPane tab="Done" key="8">
                      <OrderList orders={getFilteredOrders()} />
                  </TabPane>
              </Tabs>
          </div>
      </div>
    );
};

const OrderList = ({ orders, hasSearched }) => {
    return (
      <div>
          {hasSearched && orders.length === 0 ? (
            <Empty description="Nodata" />
          ) : (
            orders.map(order => (
              <Card className="order-card" key={order.id}>
                  <Row justify="space-between" align="middle">
                      <Col className='shop-text'>
                          <Avatar icon={<ShopOutlined />} />
                          <Text>YGJ</Text>
                          <Link to='/shop'>
                              <button className="action-btn"><ShoppingCartOutlined />Xem Shop</button>
                          </Link>
                      </Col>
                      <Col>
                          <div className='text-Status'>{order.trangthai}</div>
                      </Col>
                  </Row>
                  <Divider />
                  <Row>
                      <Col span={3} style={{ textAlign: 'center' }}>
                          <Image src="/Asset 0_p.png" alt="product" className="product-image" />
                      </Col>
                      <Col span={21}>
                          <Title level={5}>{order.product_name}</Title>
                          <div className='price-text'>
                              <Text>Phân loại hàng:...</Text>
                              <Text className="total-price">${order.price.toLocaleString()}</Text>
                          </div>
                          <Text>x{order.soluong}</Text>
                          <br />
                          <Tag color="green">Trả hàng miễn phí 15 ngày</Tag>
                      </Col>
                  </Row>
                  <Divider />
                  <Row justify="space-between" align="middle">
                      <Col>
                          <Text strong>Thành tiền: </Text>
                          <Text className="total-price">${order.total.toLocaleString()}</Text>
                      </Col>
                      <Col>
                          <Link to='/contact'>
                              <Button className="action-btn">Liên Hệ Người Bán</Button>
                          </Link>
                      </Col>
                  </Row>
              </Card>
            ))
          )}
      </div>
    );
}

export default ListOrder;
