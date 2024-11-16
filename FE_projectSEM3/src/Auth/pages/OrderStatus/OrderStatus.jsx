import './OrderStatus.css';
import { useParams } from "react-router-dom";
import { FindAllDonHangOfAccount, FindOnDonHangXuLy, updateDonHangXuLy } from "../../Services/OrderService";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Table, Image, Steps, Layout, Row, Col, Card } from 'antd';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  SmileOutlined,
  DownloadOutlined
} from '@ant-design/icons';

const { Step } = Steps;
const { Content } = Layout;

const statusOptions = {
  'Pending': 0,
  'Approved': 1,
  'Preparing': 2,
  'Shipping': 3,
  'Done': 4,
};

const icons = {
  'Pending': <ClockCircleOutlined />,
  'Approved': <CheckCircleOutlined />,
  'Preparing': <TruckOutlined />,
  'Shipping': <DownloadOutlined />,
  'Done': <SmileOutlined />,
};

const OrderStatus = () => {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { id, iddh, idpr } = useParams();
  const account = useSelector(state => state.auth.currentUser);

  const changeStatus = async () => {
    if (currentStatus < Object.keys(statusOptions).length - 1) {
      const newStatus = currentStatus + 1;
      setCurrentStatus(newStatus);
      await updateDonHang(newStatus);
    }
  };

  const subtractStatus = async () => {
    if (currentStatus < Object.keys(statusOptions).length - 1) {
      const newStatus = currentStatus - 1;
      setCurrentStatus(newStatus);
      await updateDonHang(newStatus);
    }
  };

  const rejectOrder = async () => {
    await updateDonHang(5);
    await updateDonHang(0);
    setCurrentStatus(0);
  };

  const updateDonHang = async (newStatus) => {
    try {
      const data = await updateDonHangXuLy(idpr, account.username, newStatus);
      if (data.success) {
        const statusString = Object.keys(statusOptions).find(key => statusOptions[key] === data.content.trangthai);
        if (statusString) {
          setCurrentStatus(statusOptions[statusString]);
        } else {
          console.error('Invalid status received from API:', data.content.trangthai);
        }
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  useEffect(() => {
    const getAllSp = async () => {
      try {
        const response = await FindAllDonHangOfAccount(id);
        setProducts(response.content.dataPageList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const getStatus = async () => {
      try {
        const response = await FindOnDonHangXuLy(iddh);
        const statusNumber = statusOptions[response.content.data.trangthai];
        if (statusNumber !== undefined) {
          setCurrentStatus(statusNumber);
        } else {
          console.error('Invalid status received from API:', response.content.data.trangthai);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getStatus();
    getAllSp();
  }, [id, iddh]);

  useEffect(() => {
    const calculateTotal = () => {
      const totalValue = products.reduce((acc, item) => acc + (item.price * item.soluong), 0);
      setTotal(totalValue);
    };

    calculateTotal();
  }, [products]);

  const tax = total * 0.06;
  const amount = total + tax;

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text) => (
        <Image
          width={120}
          src={text || 'https://www.shutterstock.com/image-vector/ui-line-icon-img-picture-260nw-766128430.jpg'}
          fallback="https://www.shutterstock.com/image-vector/ui-line-icon-img-picture-260nw-766128430.jpg"
        />
      ),
    },
    {
      title: 'Product name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Quantity',
      dataIndex: 'soluong',
      key: 'soluong',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$${text.toLocaleString()}`,
    },
    {
      title: 'Total',
      key: 'total',
      render: (text, record) => `$${(record.price * record.soluong).toFixed(2)}`,
    },
  ];

  return (
    <Layout style={{ padding: '20px', height: '100vh' }}>
      <Content>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card title="Order Status">
              <div className="steps-container">
                <Steps direction="horizontal" current={currentStatus}>
                  {Object.entries(statusOptions).map(([status, value]) => (
                    <Step key={value} title={status} icon={icons[status]} />
                  ))}
                </Steps>
              </div>
              <Row style={{ marginTop: '20px' }}>
                <Col xs={22} md={22}>
                  <Button
                    type="primary"
                    onClick={changeStatus}
                    style={{ marginRight: '10px' }}
                    disabled={currentStatus === statusOptions['Done']}
                  >
                    Add Status
                  </Button>
                  <Button onClick={subtractStatus} disabled={currentStatus === statusOptions['Pending']}>
                    Subtract Status
                  </Button>
                </Col>
                <Button type='primary' onClick={rejectOrder} style={{ background: 'red' }}>Rejected </Button>
              </Row>
            </Card>
          </Col>

          <Col span={24}>
            <Card title="Invoice Details">
              <Table columns={columns} dataSource={products} pagination={false} rowKey="id" />
              <div className="invoice-total" style={{ marginTop: '20px', textAlign: 'right' }}>
                <div>Total: ${total.toFixed(2)}</div>
                <div>Tax: 6%</div>
                <div>Amount: ${amount.toFixed(2)}</div>
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default OrderStatus;
