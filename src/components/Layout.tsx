import { Header } from "@/components/Header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">{children}</div>
      </div>
    </>
  );
};
