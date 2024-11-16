import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col, Row, Statistic, Table, Typography } from 'antd';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { getAllOrders } from '../../Auth/Services/OrderService';
import { TotalMoney, RemainProduct, AccountByMax, allOrder } from "../Services/OrderService";
import './DashBoard.css';
import toast from "react-hot-toast";

const { Title } = Typography;

const chartOptions = {
    series: [{
        name: 'Online Customers',
        data: [40, 70, 20, 90, 36, 80, 30, 91, 60]
    }, {
        name: 'Store Customers',
        data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
};

const fetchTopCustomers = async (accountName) => {
    const response = await axios.get(`https://localhost:44382/api/Order/FindAllDonHangByMax`, {
        params: { account_name: accountName }
    });
    return response.data;
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const Dashboard = () => {
    const [topCustomers, setTopCustomers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sumOrder, setSumOrder] = useState(0);
    const [topSales, setTopSales] = useState([]);
    const [totalRemain, setTotalRemain] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const account = useSelector(state => state.auth.currentUser);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchTopCustomers(account.username);
                setTopCustomers(response.content.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchDataMax = async () => {
            try {
                const response = await AccountByMax();
                setTopSales(response.content);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchDataRemain = async () => {
            try {
                const response = await RemainProduct();
                setTotalRemain(response.content);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchDataMoney = async () => {
            try {
                const response = await TotalMoney();
                setTotalIncome(response.content);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchAllOrder = async () => {
            try {
                const response = await allOrder(1, 1);
                setSumOrder(response.content.totalCounts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllOrder();
        fetchDataMax();
        fetchDataRemain();
        fetchData();
        fetchDataMoney();
    }, [account.username]);

    useEffect(() => {
        fetchOrders();
    }, [currentPage, pageSize]);

    const fetchOrders = async () => {
        try {
            const result = await getAllOrders(currentPage, pageSize, account.username);
            if (result.errorCode === 200) {
                setOrders(result.content.data);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const columnsOrders = [
        { title: 'Name', dataIndex: 'product_name', key: 'product_name' },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        { title: 'Quantity', dataIndex: 'soluong', key: 'soluong' },
        { title: 'Total', dataIndex: 'total', key: 'total' },
        { title: 'Date', dataIndex: 'createdate', key: 'createdate', render: text => formatDate(text) },
        { title: 'Status', dataIndex: 'trangthai', key: 'trangthai' }
    ];

    const columnsTopSales = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Purchases', dataIndex: 'soluong', key: 'soluong' }
    ];

    return (
      <div className='dashboard'>
          <Title level={2} className="page-header">Dashboard</Title>
          <Row gutter={16} style={{marginBottom: '20px'}}>
              <div className="col-6">
                  <div className="row">
                      <div className="col-6">
                          <div className='status-card'>
                              <div className="status-card__icon">
                                  <i className="bx bx-shopping-bag"></i>
                              </div>
                              <div className="status-card__info">
                                  <h4>{totalRemain}</h4>
                                  <span>Quantity product</span>
                              </div>
                          </div>
                      </div>
                      <div className="col-6">
                          <div className='status-card'>
                              <div className="status-card__icon">
                                  <i className="bx bx-cart"></i>
                              </div>
                              <div className="status-card__info">
                                  <h4>{sumOrder}</h4>
                                  <span>Total Orders</span>
                              </div>
                          </div>
                      </div>
                      <div className="col-6">
                          <div className='status-card'>
                              <div className="status-card__icon">
                                  <i className="bx bx-dollar-circle"></i>
                              </div>
                              <div className="status-card__info">
                                  <h4>{totalIncome.toLocaleString()}</h4>
                                  <span>Revenue</span>
                              </div>
                          </div>
                      </div>
                      <div className="col-6">
                          <div className='status-card'>
                              <div className="status-card__icon">
                                  <i className="bx bx-receipt"></i>
                              </div>
                              <div className="status-card__info">
                                  <h4>{topCustomers.length}</h4>
                                  <span>Daily visits</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <Col span={12}>
                  <Card style={{height: '247px'}}>
                      <Chart options={chartOptions.options} series={chartOptions.series} type="line" height="100%"/>
                  </Card>
              </Col>
          </Row>

          <Row gutter={[20, 20]}>
              <Col span={24}>
                  <Card title="Latest Orders">
                      <Table columns={columnsOrders} dataSource={orders} pagination={{pageSize}}/>
                  </Card>
              </Col>
              <Col span={24}>
                  <Card title="Top Customers">
                      <Table columns={columnsTopSales} dataSource={topSales}/>
                  </Card>
              </Col>
          </Row>
      </div>
    );
};

export default Dashboard;
