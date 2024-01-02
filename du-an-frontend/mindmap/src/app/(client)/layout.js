// ../../../../../components
import getCurrentUser from "@/actions/getCurrentUser";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const ClientLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default ClientLayout;
