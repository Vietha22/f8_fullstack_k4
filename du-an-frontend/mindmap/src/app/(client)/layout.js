// ../../../../../components
import getCurrentUser from "@/actions/getCurrentUser";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const ClientLayout = async({ children }) => {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <Header currentUser={currentUser}/>
      {children}
      <Footer />
    </div>
  );
};

export default ClientLayout;
