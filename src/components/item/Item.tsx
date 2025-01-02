import useThemeContext from "../../hooks/useThemeContext";
import { Item as ItemType } from "./ItemList";

interface Props {
  item: ItemType;
}
function Item({ item }: Props) {
  const { theme } = useThemeContext();

  return (
    <li
      key={item.id}
      className={`p-2 rounded shadow ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
    >
      {item.name} - {item.category} - {item.price.toLocaleString()}원
    </li>
  );
}

export { Item };
