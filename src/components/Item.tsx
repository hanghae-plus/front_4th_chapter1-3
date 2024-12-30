import { memo } from 'react';
import { Item } from '../@lib/type/type';

type Props = {
  theme: string;
  index: number;
  item: Item;
};

const ItemComponent = memo(({ theme, index, item }: Props) => {
  return (
    <li
      key={index}
      className={`p-2 rounded shadow ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-700 text-white'}`}
    >
      {item.name} - {item.category} - {item.price.toLocaleString()}원
    </li>
  );
});

export default ItemComponent;
