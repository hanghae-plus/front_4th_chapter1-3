import NotificationSystem from './NotificationSystem';
import { useThemeContext } from '../@lib/hooks/useThemeContext';
import { memo } from '../@lib';
import Content from './Content';

const Main = memo(() => {
  const { theme } = useThemeContext();
  return (
    <div
      className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-white'}`}
    >
      <Content />
      <NotificationSystem />
    </div>
  );
});

export default Main;
