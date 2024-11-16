

import { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import './checkout.css';
import { Col, Row } from "antd";
import { addProcessOrder } from "../../services/orderService"
import { useSelector } from 'react-redux';

const Checkout = () => {
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [checkBox, setCheckBox] = useState(null);
    const [nganhang, setNganhang] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [createPayment, setCreatePayment] = useState({
        paymentContent: "",
        paymentCurrency: "",
        paymentRefId: 0,
        paymentAmount: 0.0,
        paymentDate: null,
        expireDate: null,
        paymentLanguage: "",
        merchantId: 0,
        paymentDestinationId: 0,
        signature: ""
    });
    const account = useSelector(state => state.auth.currentUser);

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        description: ''
    });

    const handleaddProcessOrder = async () => {
        const orderItems = cart.map(item => ({
            id: 0,
            product_id: item.product_id,
            product_name: item.product_name,
            account_name: account.username,
            price: item.price,
            soluong: item.soluong,
            total: item.soluong * item.price,
            trangthai: 0,
            account_id: account.id,
            vanchuyen_id: 0
        }));

        try {
            const response = await addProcessOrder(orderItems);
            var a = response

        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Failed to place order. Please try again.',
                icon: 'error',
                duration: 5000
            });
            console.error('Error placing order:', error);
        }
    }


    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        const total = storedCart.reduce((acc, item) => acc + (item.soluong * item.price), 0);
        setTotalAmount(total);
    }, []);

    const validateForm = () => {
        const errors = {};
        if (!formValues.firstName) errors.firstName = 'First name is required';
        if (!formValues.lastName) errors.lastName = 'Last name is required';
        if (!formValues.email) errors.email = 'Email is required';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues({
            ...formValues,
            [id]: value
        });
    };

    const handlePaymentChange = (e) => {
        setNganhang(e.target.value);
    };

    const ThanhToan = async () => {
        if (!validateForm()) {
            Swal.fire({
                title: "Error",
                text: "Please fill out all required fields",
                icon: "error",
                duration: 5000
            });
            return;
        }

        const now = moment();
        setCreatePayment(prev => ({
            ...prev,
            paymentDate: now.format(),
            expireDate: now.add(1, 'day').format()
        }));

        try {
            if (nganhang === "") {
                Swal.fire({
                    title: "Thông báo",
                    text: "Chọn phương thức thanh toán",
                    icon: "error",
                    duration: 5000
                });
            } else {
                const paymentData = {
                    ...createPayment,
                    paymentContent: "Thanh toán Online",
                    paymentCurrency: "VND",
                    paymentRefId: 1,
                    paymentAmount: totalAmount,
                    paymentLanguage: "vn",
                    merchantId: 1,
                    paymentDestinationId: nganhang === "zalopay" ? 1 : 2,
                    signature: "qwerty"
                };
                // await handleaddProcessOrder()
                const response = await axios.post(`https://localhost:44382/api/Payments/Create`, paymentData);
                console.log ('response' ,response)
                // window.location.href = `${response.data.data.paymentUrl}`;
                // response.data.data.paymentUrl && window.location.replace('/thankyou');
            }
        } catch (error) {
            if (error.response) {
                Swal.fire(error.response.data);
            }
        }
    };

    const isChecked = (index) => checkBox === index;

    const thanhToanOnline = (type, index) => {
        setNganhang(type);
        setCheckBox(prevCheckBox => prevCheckBox === index ? null : index);
    };

    const getTokenConfig = () => {
        const info = JSON.parse(localStorage.getItem("persist:auth"));
        const token = info.token.replace(/"/g, '');
        return {
            headers: { Authorization: `Bearer ${token}` }
        };
    };

    return (
        <div id='checkout-form'>
            <h2>Checkout</h2>
            <Row gutter={[20, 12]}>
                <Col md={15} xs={24}>
                    <Row gutter={[12, 12]}>
                        <Col md={12}>
                            <Form.Group controlId="firstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" placeholder="First name" value={formValues.firstName} onChange={handleInputChange} isInvalid={!!formErrors.firstName} />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group controlId="lastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" placeholder="Last name" value={formValues.lastName} onChange={handleInputChange} isInvalid={!!formErrors.lastName} />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Email" value={formValues.email} onChange={handleInputChange} isInvalid={!!formErrors.email} />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={24}>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter any additional information here" value={formValues.description} onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col md={24}>
                            <Form.Group>
                                <Form.Label>Payment</Form.Label>
                                <div className='pay'>
                                    <Form.Check
                                        type="radio"
                                        label={
                                            <div>
                                                <img src='/zalo-pay.jpg' />
                                            </div>
                                        }
                                        name="paymentMethod"
                                        id="paypal"
                                        value="vnpay"
                                        onChange={handlePaymentChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={
                                            <div>

                                                <img src='/vnpay.jpg' />
                                            </div>
                                        }
                                        name="paymentMethod"
                                        id="zalopay"
                                        value="zalopay"
                                        onChange={handlePaymentChange}
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col md={8} xs={24}>
                    <Card>
                        <Card.Body>
                            <h2>The total amount of</h2>
                            <Row gutter={[16, 16]}>
                                <Col md={18} style={{ color: 'red' }}>Temporary amount</Col>
                                <Col md={6}>${totalAmount.toFixed(2)}</Col>
                                <Col md={18}>Shipping</Col><Col md={6}>Gratis</Col>
                                <Col md={24}>
                                    <div className="shipping-options">
                                        SHIPPING OPTIONS
                                    </div>
                                </Col>
                                <Col md={24}><h3 style={{ textAlign: 'center' }}>${totalAmount.toFixed(2)}</h3></Col>
                            </Row>
                            <Col md={24}>
                                <Link to='/'>
                                    <div className="shipping-options">
                                        BUY MORE
                                    </div>
                                </Link>

                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
                <button className='button-order payment' onClick={ThanhToan}><span>Proceed to payment</span></button>
            </Row>
        </div>

    );
};

export default Checkout;
