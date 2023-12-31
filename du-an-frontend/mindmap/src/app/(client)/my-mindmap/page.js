import getCurrentUser from "@/actions/getCurrentUser";
import MapList from "@/components/MapList";
import MindMapHeader from "@/components/MindMapHeader";
import { db } from "@/libs/db";
import { redirect } from "next/navigation";

const Mindmap = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return redirect("/signIn");
  const maps = await db.mindmap.findMany({
    where: {
      userId: currentUser?.id,
    },
  });

  return (
    <div className="container px-4 mx-auto">
      <div className="text-start">
        <MindMapHeader />
        {maps.map((map) => {
          return <MapList key={map.id} map={map} />;
        })}
      </div>
    </div>
  );
};

export default Mindmap;
