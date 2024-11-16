import { useState, useEffect } from 'react';
import { Form, Input, Button, Rate, notification, Tag, Modal, Row, Col, Upload, Select } from 'antd';
import './RateSection.css';
import moment from 'moment/moment';
const { Option } = Select;
const { TextArea } = Input;
import { getAllRating, createRating } from "../../../../services/rateService.js";
import { useSelector } from 'react-redux';

const RateSection = ({ productId }) => {
  const [dataRating, setDataRating] = useState([]);
  const [form] = Form.useForm();
  const [rating, setRating] = useState(0);
  const [submittedComment, setSubmittedComment] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const account = useSelector(state => state.auth.currentUser);

  const handleSubmit = async (values) => {
    const commentData = {
      ...values,
      sao: rating,
      product_id: productId,
      account_id: account.id,
    };

    try {
      var data = await createRating(commentData);
      setSubmittedComment(commentData);
      if (data.errorCode === 417) {
        notification.error({
          message: 'Bạn đã đánh giá rồi!',
          description: 'Cảm ơn bạn đã gửi đánh giá.',
        });
        return
      }
      notification.success({
        message: 'Đánh giá thành công!',
        description: 'Cảm ơn bạn đã gửi đánh giá.',
      });
      form.resetFields();
      setRating(0);
      setIsModalVisible(false);
      findAllRating();
    } catch (error) {
      notification.error({
        message: 'Đánh giá không thành công!',
        description: 'Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.',
      });
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const purchased = true;

  const handleFilterChange = (filter) => {
    setFilterType(filter);
  };

  const findAllRating = async () => {
    try {
      const data = await getAllRating(productId, 1, 30);
      setDataRating(data.content.dataPageList);

    } catch (error) {
      console.error("Failed to fetch ratings:", error);
    }
  };

  useEffect(() => {
    findAllRating();
  }, []);

  return (
    <div id="comment-container">
      <h2>Customer Feedback</h2>
      <Row style={{ borderBottom: '1px solid' }}>
        <Col span={16}>
          <Col span={24}>
            <span className="score">5.0</span>
            <Rate disabled defaultValue={5} />
          </Col>
          <Col span={24}>
            <span style={{fontSize: "20px"}}>There are {dataRating.length} feedbacks from customer</span>
          </Col>
          <Button onClick={showModal}
                  className='button-Comment'
                  style={{ marginTop: '10px', marginBottom: '20px', marginLeft: "0"}}>
            Comment</Button>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={24}>
              <Input.Group compact>
                <Button
                  className={filterType === 'all' ? 'button-evaluate' : 'default'}
                  onClick={() => handleFilterChange('all')}
                >
                  Total comments
                </Button>
                <Button
                  className={filterType === 'images' ? 'button-evaluate' : 'default'}
                  onClick={() => handleFilterChange('images')}
                >
                  Image/video
                </Button>
                <Select
                  placeholder="Chọn sao"
                  style={{ height: '50px', width: '130px', textAlign: 'center' }}
                  defaultValue={5}
                >
                  {[1, 2, 3, 4, 5].map(star => (
                    <Option key={star} value={star}>
                      {[...Array(star)].map((_, i) => (
                        <img key={i} src='/Star.svg' alt="star" style={{ width: '16px', height: '16px' }} />
                      ))}
                    </Option>
                  ))}
                </Select>
              </Input.Group>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        title={
          <h2 style={{ textAlign: 'center', marginBottom: "30px"}}>
            Feedback
          </h2>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >

          <Form.Item
            name="message"
            label="Share your experience with our product"
            rules={[{ required: true, message: 'Please leave your comment!' }]}
          >
            <TextArea rows={4} placeholder="Your experience" />
          </Form.Item>

          <Form.Item
            label="Rating"
          >
            <Rate
              value={rating}
              onChange={(value) => setRating(value)}
              className="rating-star"
            />
          </Form.Item>

          <Form.Item className="submit-button">
            <Button type="primary" htmlType="submit" style={{width: "450px", height: "36px", fontSize: "18px"}}>
              Send
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {dataRating.map((rating, index) => (
        <div key={index} className="review">
          <div className="review-header">
            <div className="review-name">{rating.accountName}</div>
            <Rate disabled defaultValue={rating.sao} />
          </div>
          <div className="review-time">
            {moment(rating.createdAt).format("DD/MM/YYYY")} <Tag color="green">{purchased ? 'Đã mua' : 'Chưa mua'}</Tag>
          </div>
          <div className="review-text">
            {rating.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RateSection;
