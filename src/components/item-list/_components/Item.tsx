import { ItemType } from "../ItemList";
import { useGetTheme } from "../../../contexts/theme-context/useThemeContext";
import { memo } from "../../../@lib";

interface ItemProps {
  item: ItemType;
}

const Item = memo(({ item }: ItemProps) => {
  const theme = useGetTheme();

  return (
    <li
      className={`p-2 rounded shadow ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
    >
      {item.name} - {item.category} - {item.price.toLocaleString()}원
    </li>
  );
});

export default Item;
