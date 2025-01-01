import { createPortal } from "react-dom";

interface Props {
  id: string;
  children: React.ReactNode;
}

function Portal({ id, children }: Props) {
  const $container = document.getElementById(id) || document.body;
  if (!$container) return null;
  return createPortal(children, $container);
}

export default Portal;
