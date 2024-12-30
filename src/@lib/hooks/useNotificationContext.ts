import { useContext } from 'react';
import { NotificationContext } from '../../components/providers/NotificationProvider';

// 커스텀 훅: useNotificationContext
const useNotificationContext = () => {
  //todo: 유저 컨텍스트의 상태를 기반으로 노티 add, remove 처리해야함
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotification Context must be used within an NotificationProvider'
    );
  }
  return context;
};

export default useNotificationContext;
