import React from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { useUserStore } from '../stores/UserStore';

const Navigation: React.FC = observer(() => {
  const userStore = useUserStore();

  return (
    <Button onClick={() => userStore.toggleRole()}>
 Switch to {userStore.role === 'admin' ? 'User' : 'Admin'}
    </Button>
  );
});

export default Navigation;