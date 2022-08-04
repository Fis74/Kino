import { FC, PropsWithChildren } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { BottomNavigation } from "../UI/BottomNavigation/BottomNavigation";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
      <BottomNavigation />
    </>
  );
};

export default Layout;
