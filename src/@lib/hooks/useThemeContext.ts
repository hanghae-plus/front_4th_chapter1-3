import { useContext } from 'react';
import { ThemeContext } from '../../components/providers/ThemeProvider';

// 커스텀 훅: useAppContext
const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within an AppProvider');
  }
  return context;
};

export { useThemeContext };
