import { useState, useEffect } from 'react';
import { Modal, Input, Button, Upload, Select, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createProduct, editProduct } from '../../Services/ProductService';
import { getAllCategories } from '../../Services/CategoryService';
import './AddModal.scss';

const { Option } = Select;

const AddProductModal = ({ isOpen, onRequestClose, onProductAdded, productToEdit }) => {
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();
    const [categoryMap, setCategoryMap] = useState({}); // Map to store category names and IDs

    useEffect(() => {
        // Fetch categories on component mount
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories(1, 200);
                if (response && response.errorCode === 200) {
                    const categoryOptions = response.content.data.map(category => ({
                        value: String(category.id), // Ensure IDs are strings
                        label: category.name,
                    }));
                    setCategories(categoryOptions);

                    // Create a map from category names to IDs for quick lookup
                    const map = response.content.data.reduce((acc, category) => {
                        acc[category.name] = String(category.id);
                        return acc;
                    }, {});
                    setCategoryMap(map);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (productToEdit) {
            form.setFieldsValue({
                title: productToEdit.title,
                description: productToEdit.description,
                price: productToEdit.price,
                click: productToEdit.click,
                soluong: productToEdit.soluong,
                categories: productToEdit.category.map(cat => categoryMap[cat] || cat), // Map names to IDs
            });
            setImages(productToEdit.image);
        } else {
            form.resetFields();
            setImages([]);
        }
    }, [productToEdit, categoryMap]);

    const validateFields = () => {
        return form.validateFields().then(() => true).catch(() => false);
    };

    const handleAddProduct = async () => {
        if (!await validateFields()) {
            return;
        }

        try {
            const formValues = form.getFieldsValue();
            const productData = {
                id: productToEdit ? productToEdit.id : 0,
                title: formValues.title,
                description: formValues.description,
                image: images,
                category: formValues.categories,
                price: formValues.price,
                click: formValues.click,
                account_id: 0,
                account_name: "admin",
                imageShop: "",
                nameShop: "",
                soluong: formValues.soluong
            };

            if (productToEdit) {
                await editProduct(productData);
            } else {
                await createProduct(productData);
            }
            message.success('Product saved successfully!');
            onRequestClose();
            onProductAdded();
            setImages([]);
            form.resetFields()
        } catch (error) {
            message.error('Error saving product.');
            console.error('Error saving product:', error);
        }
    };

    const handleImageChange = ({ fileList }) => {
        const getBase64 = (file) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        const processFiles = async () => {
            const base64Images = await Promise.all(fileList.map(async (file) => {
                if (file.url) {
                    return file.url; // For already uploaded images
                } else {
                    return await getBase64(file.originFileObj);
                }
            }));
            setImages(base64Images);
        };

        processFiles();
    };

    const handleImageRemove = (file) => {
        setImages(prevImages => prevImages.filter(image => image !== file.url));
    };

    return (
        <Modal
            title={productToEdit ? "Edit Product" : "Add New Product"}
            open={isOpen}
            onCancel={onRequestClose}
            footer={[
                <Button key="close" onClick={onRequestClose}>Close</Button>,
                <Button key="submit" type="primary" onClick={handleAddProduct}>
                    {productToEdit ? "Save" : "Add Product"}
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    categories: [],
                }}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Title is required.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Description is required.' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Images"
                >
                    <Upload
                        listType="picture-card"
                        fileList={images.map(image => ({ url: image }))}
                        onChange={handleImageChange}
                        onRemove={handleImageRemove}
                        multiple
                        accept="image/*"
                    >
                        <UploadOutlined /> Upload
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="categories"
                    label="Categories"
                    rules={[{ required: true, message: 'Category is required.' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select categories"
                    >
                        {categories.map(category => (
                            <Option key={category.value} value={category.value}>
                                {category.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                        { required: true, message: 'Price is required.' },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="soluong"
                    label="Quantity"
                    rules={[
                        { required: true, message: 'Quantity is required.' },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="click"
                    label="Click"
                >
                    <Input type="number" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProductModal;
