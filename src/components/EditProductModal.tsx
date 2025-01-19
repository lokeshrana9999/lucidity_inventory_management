// src/components/EditProductModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, InputNumber } from 'antd';
import { Product } from '../stores/InventoryStore';
import { toJS } from 'mobx';
import { prefix } from './ProductTable';

interface EditProductModalProps {
  visible: boolean;
  editingProduct: Product | null;
  onCancel: () => void;
  onOk: (values: Product) => void;
}


const EditProductModal: React.FC<EditProductModalProps> = ({
  visible,
  editingProduct,
  onCancel,
  onOk,
}) => {

  const product = toJS(editingProduct);
  const [productDetails, setProductDetails] = useState({
    id: product?.id || '',
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price.replace(prefix, '') || '',
    quantity: product?.quantity || 0,
    value: product?.value.replace(prefix, '') || '',
  });

  useEffect(() => {
    const product = toJS(editingProduct);
    setProductDetails({
      id: product?.id || '',
      name: product?.name || '',
      category: product?.category || '',
      price: product?.price.replace(prefix, '') || '',
      quantity: product?.quantity || 0,
      value: product?.value.replace(prefix, '') || '',
    });
  }, [editingProduct]);

  const handleChange = (key: string, value: string) => {
    const newPrice = key === 'price' ? value.replace(prefix, '') : productDetails.price;
    const newQuantity = key === 'quantity' ? parseInt(value, 10) || 0 : productDetails.quantity;
    const calculatedValue = (parseFloat(newPrice) || 0) * (newQuantity || 0);

    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [key]: key === 'quantity' ? newQuantity : value.replace(prefix, ''),
      value: calculatedValue.toFixed(0),
    }));
  };


  const handleOKFunction = () => {
    onOk({...productDetails, price: prefix + productDetails.price, value: prefix + productDetails.value});
  }

  const handleChangeStatic = (key: string, value: string) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  return (
    <Modal
      title="Edit Product"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        onFinish={handleOKFunction}
        // onValuesChange={onFormValuesChange}
      >
        <Form.Item label="Name">
          <Input value={productDetails.name} onChange={(e) => handleChangeStatic('name', e.target.value)} />
        </Form.Item>
        <Form.Item  label="Category">
          <Input value={productDetails.category} onChange={(e) => handleChangeStatic('category', e.target.value)} />
        </Form.Item>
        <Form.Item  label="Price">
          <InputNumber  
            value={productDetails.price}
            prefix={prefix}
            onChange={(value) => handleChange('price', value?.toString() || '')}
          />
        </Form.Item>
        <Form.Item label="Quantity">
          <InputNumber
            value={productDetails.quantity}
            onChange={(value) => handleChange('quantity', value?.toString() || '')}
          />
        </Form.Item>
        <Form.Item  label="Value">
          <InputNumber
            value={productDetails.value}
            prefix={prefix}
            readOnly
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;