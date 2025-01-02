import { IItem } from "../type/type";

export const Item = ({ item, theme }: { item: IItem; theme: string }) => {
  return (
    <li
      className={`p-2 rounded shadow ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
    >
      {item.name} - {item.category} - {item.price.toLocaleString()}원
    </li>
  );
};
