import { useEffect } from "react";
import { Header } from "./components/Header";
import { FormSlider } from "./components/FormSlider";
import { ListResultTable } from "./components/ListResultTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    toast.info("Chào mừng bạn đến với trò chơi đoán số!");
  }, []);

  return (
    <main
      className={`${
        theme === "dark" ? "dark" : "light"
      } text-foreground bg-background min-h-screen p-4 relative`}
    >
      <ToastContainer
        toastStyle={
          theme === "dark" ? { backgroundColor: "black", color: "white" } : null
        }
      />
      <Header />
      <FormSlider />
      <ListResultTable />
    </main>
  );
}

export default App;
