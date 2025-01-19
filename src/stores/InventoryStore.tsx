import { makeAutoObservable, runInAction } from 'mobx';
import React, { createContext, ReactNode, useContext } from 'react';

// Define a type for the product
export interface Product {
  id: string;
  name: string;
  category: string;
  value: string;
  quantity: number;
  price: string;
  disabled?: boolean;
}

class InventoryStore {
  products: Product[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Method to set products (simulating an API call)
  setProducts(products: Product[]) {
    this.products = products;
  }

  // Method to fetch products (simulated)
  async fetchProducts() {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const response = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory', {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data: Product[] = await response.json();
      data.forEach((product, index) => {
        product.id = index.toString();
      });
      // let  data: Product[] = [
      //   { "id": "1", "name": "Bluetooth", "category": "Electronic", "value": "$150", "quantity": 5, "price": "$30" }, 
      //   { "id": "2", "name": "Edifier M43560", "category": "Electronic", "value": "0", "quantity": 0, "price": "$0" }, 
      //   { "id": "3", "name": "Sony 4k ultra 55 inch TV", "category": "Electronic", "value": "$1190", "quantity": 17, "price": "$70" }, 
      //   { "id": "4", "name": "Samsumg 55 inch TV", "category": "Electronic", "value": "$600", "quantity": 50, "price": "$12" }, 
      //   { "id": "5", "name": "samsumg S34 Ultra", "category": "phone", "value": "$0", "quantity": 0, "price": "$0" }
      // ]
      runInAction(() => {
        this.setProducts(data);
        this.isLoading = false;
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Method to delete a product
  deleteProduct(id: string) {
    this.products = this.products.filter(product => product.id !== id);
  }

  // Method to disable a product
  disableProduct(id: string) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      product.disabled = !product.disabled; // Assuming you add a 'disabled' property to Product
    }
  }

  // Method to update a product
  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }
}

const inventoryStore = new InventoryStore();
const InventoryStoreContext = createContext<InventoryStore | null>(null);

export const InventoryStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <InventoryStoreContext.Provider value={inventoryStore}>{children}</InventoryStoreContext.Provider>;
};

export const useInventoryStore = () => {
  const context = useContext(InventoryStoreContext);
  if (!context) {
    throw new Error('useInventoryStore must be used within an InventoryStoreProvider');
  }
  return context;
};
