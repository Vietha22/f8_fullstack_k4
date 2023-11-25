import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../components/icons/MoonIcon";
import { SunIcon } from "../components/icons/SunIcon";
import { useSelector, useDispatch } from "react-redux";

export const Header = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch({ type: "theme/toggle" });
  };

  return (
    <div className="h-full w-full">
      <hr className="bg-primary h-2 transition-all w-full opacity-60 fixed top-0 left-0" />
      <h2 className="mt-4 text-primary text-4xl font-bold">
        Chào mừng bạn đến với trò chơi đoán số!
      </h2>
      <Switch
        className="fixed right-4 top-5"
        isSelected={theme === "dark"}
        onValueChange={toggleTheme}
        size="lg"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
      />
    </div>
  );
};
