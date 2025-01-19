import React from 'react';
import { Layout } from 'antd';
// import app css
import './App.css';
import { observer } from 'mobx-react-lite';
import Navigation from './components/Navigation';
import ProductTable from './components/ProductTable';
import { UserStoreProvider } from './stores/UserStore';
import { InventoryStoreProvider } from './stores/InventoryStore';

const { Header, Content } = Layout;

const App: React.FC = observer(() => {
  return (
    <UserStoreProvider>
      <InventoryStoreProvider>
        <Layout>
          <Header>
            <Navigation />
          </Header>
          <Content>
            <ProductTable />
          </Content>
        </Layout>
      </InventoryStoreProvider>
    </UserStoreProvider>
  );
});

export default App;
