import { useState, useEffect } from 'react';
import { Modal, Input, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { addUser, updateUser, getAllRole } from '../../Services/UserService';
import './index.css';
import './AddModal.scss';
import { useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';

const { Option } = Select;

const AddCustomerModal = ({ isOpen, onRequestClose, onCustomerAdded, customerToEdit }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [roles, setRoles] = useState([]);
    const [fileList, setFileList] = useState([]);
    const account = useSelector(state => state.auth.currentUser);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getAllRole();
                setRoles(response.content);
            } catch (error) {
                console.error('Error fetching roles:', error);
                message.error('An error occurred while fetching roles.');
            }
        };

        fetchRoles();

        if (customerToEdit) {
            setName(customerToEdit.name);
            setImage(customerToEdit.image);
            setPhone(customerToEdit.phone);
            setEmail(customerToEdit.email);
            setPassword('');
            setRole(customerToEdit.role);
            setIsActive(customerToEdit.action === "Action" ? true : false);
            setFileList([{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: customerToEdit.image,
            }]);
        } else {
            setName('');
            setImage('');
            setPhone('');
            setEmail('');
            setPassword('');
            setRole('');
            setIsActive(false);
            setFileList([]);
        }
    }, [customerToEdit]);

    const handleSaveCustomer = async () => {
        if (!name || !email || !phone || !role || (!customerToEdit && !password)) {
            message.error('Name, email, phone number, role, and password are required.');
            return;
        }
        const encryptedPassword = CryptoJS.HmacSHA256(password, "ThisismySecretKeyThisismySecretKey").toString(CryptoJS.enc.Base64);
        try {
            if (customerToEdit) {
                await updateUser({
                    id: customerToEdit.id,
                    username: name,
                    password: encryptedPassword,
                    email: email,
                    phonenumber: phone,
                    action: isActive,
                    image: image,
                    role_id: role,
                    shop_id: 0,
                    shop_name: "string",
                    role_Name: "string",
                    token: account.token
                });
            } else {
                await addUser({
                    id: 0,
                    username: name,
                    password: encryptedPassword,
                    email: email,
                    phonenumber: phone,
                    action: isActive,
                    image: image,
                    role_id: role,
                    shop_id: 0,
                    shop_name: "string",
                    role_Name: "string",
                    token: account.token
                });
            }
            onRequestClose();
            onCustomerAdded();
        } catch (error) {
            console.error('Error saving customer:', error);
            message.error('An error occurred while saving the customer.');
        }
    };

    const handleImageChange = (info) => {
        if (info.fileList.length > 0) {
            const file = info.fileList[0].originFileObj;
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setFileList([{
                    uid: '-1',
                    name: file.name,
                    status: 'done',
                    url: reader.result,
                }]);
            };
            reader.readAsDataURL(file);
        } else {
            setImage('');
            setFileList([]);
        }
    };

    return (
        <Modal
            open={isOpen}
            title={customerToEdit ? "Edit Customer" : "Add New Customer"}
            onCancel={onRequestClose}
            onOk={handleSaveCustomer}
            okText={customerToEdit ? "Save Changes" : "Add Customer"}
        >
            <div id='AddCustomerModal'>
                <div>
                    <label>Name:</label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleImageChange}
                        showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
                    >
                        {fileList.length < 1 && <UploadOutlined />}
                    </Upload>
                </div>
                <div>
                    <label>Email:</label>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Phone number:</label>
                    <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label>Is Active:</label>
                    <Select
                        value={isActive}
                        onChange={(value) => setIsActive(value)}
                        style={{ width: '100%' }}
                    >
                        <Option value={true}>True</Option>
                        <Option value={false}>False</Option>
                    </Select>
                </div>
                <div>
                    <label>Role:</label>
                    <Select
                        value={role}
                        onChange={(value) => setRole(value)}
                        style={{ width: '100%' }}
                    >
                        {roles.map((role) => (
                            <Option key={role.id} value={role.id}>
                                {role.name}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
        </Modal>
    );
};

export default AddCustomerModal;
