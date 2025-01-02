export const Button = ({
  theme = "primary",
  onClick,
  children,
}: {
  theme?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  const styles: Record<string, string> = {
    primary: "bg-blue-500 hover:bg-blue-700",
    success: "bg-green-500 hover:bg-green-700",
    danger: "bg-red-500 hover:bg-red-700",
  };

  return (
    <button
      className={`${styles[theme]} text-white font-bold py-2 px-4 rounded mr-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
