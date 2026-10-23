import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CartProvider from "@/context/CartContext";

const Layout = ({ children }) => {
  return (
 <CartProvider>
    <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white">
      <Navbar/>
      {children}
  <Footer/>
    </main>
 </CartProvider>
  );
};

export default Layout;