import { useContext } from 'react';
import { NotificationContext } from '../../components/providers/NotificationProvider';

// 커스텀 훅: useNotificationContext
const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      'useNotification Context must be used within an NotificationProvider'
    );
  }
  return context;
};

export default useNotificationContext;
