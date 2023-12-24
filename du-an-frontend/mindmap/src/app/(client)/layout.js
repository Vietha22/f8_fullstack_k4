// ../../../../../components
import Header from "@/components/Header";

const ClientLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default ClientLayout;
