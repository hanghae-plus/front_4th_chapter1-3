import { useContext } from 'react';
import { UserContext } from '../../components/providers/UserProvider';

// 커스텀 훅: useUserContext
const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within an AppProvider');
  }
  return context;
};

export default useUserContext;
