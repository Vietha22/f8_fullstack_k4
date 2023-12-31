import image404 from "@/assets/images/image404.jpg";
import Image from "next/image";
import Link from "next/link";
const NotFound = () => {
  // console.log(image404);
  return (
    <div className="w-screen h-screen">
      <Image
        src={image404}
        alt="404 Not Found"
        style={{ width: "100vw", height: "100vh" }}
      />
    </div>
  );
};

export default NotFound;
