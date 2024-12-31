import { useContext } from 'react';
import { ItemsContext } from '../../components/providers/ItemsProvider';

// 커스텀 훅: useItemContext
const useItemsContext = () => {
  const context = useContext(ItemsContext);

  if (context === undefined) {
    throw new Error('useItemsContext must be used within an ItemsProvider');
  }
  return context;
};

export default useItemsContext;
