import useThemeContext from "../../hooks/useThemeContext";

type Props = {
  children: React.ReactNode;
};

export function ThemeContainer({ children }: Props) {
  const { theme } = useThemeContext();
  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      {children}
    </div>
  );
}
