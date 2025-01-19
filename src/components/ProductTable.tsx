import React, { useEffect, useState } from 'react';
import { Table, Button, Statistic, Card, Tooltip, Popconfirm, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { Product, useInventoryStore } from '../stores/InventoryStore';
import EditProductModal from './EditProductModal';
import { useUserStore } from '../stores/UserStore';
import { EditOutlined, DeleteOutlined, StopOutlined, CheckOutlined } from '@ant-design/icons';


export const prefix = '$';

const ProductTable: React.FC = observer(() => {
  const inventoryStore = useInventoryStore();
  const userStore = useUserStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);


  const enabledProducts = inventoryStore.products.filter(product => !product.disabled);
  // Calculate statistics
  const totalProducts = enabledProducts.length;
  const totalValue = enabledProducts.reduce((acc, product) => {
    const value = product.value.replace('$', '');
    return acc + (parseFloat(value) || 0)
  }, 0);
  const outOfStock = enabledProducts.filter(product => product.quantity === 0).length;
  const categories = new Set(enabledProducts.map(product => product.category)).size;
  const totalInventory = enabledProducts.reduce((acc, product) => acc + product.quantity, 0);

  useEffect(() => {
    inventoryStore.fetchProducts();
  }, [inventoryStore]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  const handleDelete = (name: string) => {
    inventoryStore.deleteProduct(name);
  };

  const handleDisable = (name: string) => {
    inventoryStore.disableProduct(name);
  };

  const handleOk = (values: Product) => {
    inventoryStore.updateProduct(values);
    setIsModalVisible(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
  };

  const disableActions = userStore.role === 'user';

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Product) => (
        <>
          <Tooltip title="Edit Product">
            <Button disabled={disableActions || record.disabled} onClick={() => handleEdit(record)} icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Delete Product">
            <Popconfirm
              title="Are you sure you want to delete this product?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button 
                danger 
                type="primary" 
                disabled={disableActions || record.disabled} 
                icon={<DeleteOutlined />} 
              />
            </Popconfirm>
          </Tooltip>
          <Tooltip title={record.disabled ? "Enable Product" : "Disable Product"}>
            <Button 
              danger={!record.disabled} 
              disabled={disableActions} 
              onClick={() => handleDisable(record.id)} 
              icon={record.disabled ? <CheckOutlined /> : <StopOutlined />} 
            />
          </Tooltip>
        </>
      ),
    },
  ];

  if (inventoryStore.isLoading) {
    return (
      <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', overflowX: 'auto', height: '100px', margin: "10px" }}>
        <Card style={{ flex: '0 0 auto', marginRight: '16px' }}>
          <Statistic title="Total Products" value={totalProducts} />
        </Card>
        <Card style={{ flex: '0 0 auto', marginRight: '16px' }}>
          <Statistic title="Total Store Value" value={totalValue} precision={2} prefix="$" />
        </Card>
        <Card style={{ flex: '0 0 auto', marginRight: '16px' }}>
          <Statistic title="Out of Stock" value={outOfStock} />
        </Card>
        <Card style={{ flex: '0 0 auto', marginRight: '16px' }}>
          <Statistic title="Number of Categories" value={categories} />
        </Card>
        <Card style={{ flex: '0 0 auto', marginRight: '16px' }}>
          <Statistic title="Total Inventory" value={totalInventory} />
        </Card>
        <Card style={{ flex: '0 0 auto', marginRight: '16px' }}>
          <Statistic 
            title="Active Products" 
            value={enabledProducts.length} 
          />
        </Card>
      </div>
      <Table
        dataSource={inventoryStore.products}
        columns={columns}
        rowKey="name"
        pagination={false}
      />
      {editingProduct && <EditProductModal
        visible={isModalVisible}
        editingProduct={editingProduct}
        onCancel={handleCancel}
        onOk={handleOk}
      />}
    </>
  );
});

export default ProductTable;
