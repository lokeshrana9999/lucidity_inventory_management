import { makeAutoObservable } from 'mobx';
import React, { createContext, ReactNode, useContext } from 'react';

class UserStore {
  role: 'admin' | 'user' = 'user';

  constructor() {
    makeAutoObservable(this);
  }

  toggleRole() {
    this.role = this.role === 'admin' ? 'user' : 'admin';
  }
}

const userStore = new UserStore();
const UserStoreContext = createContext<UserStore | null>(null);

export const UserStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <UserStoreContext.Provider value={userStore}>{children}</UserStoreContext.Provider>;
};

export const useUserStore = () => {
  const context = useContext(UserStoreContext);
  if (!context) {
    throw new Error('useUserStore must be used within a UserStoreProvider');
  }
  return context;
};
