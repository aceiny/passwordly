import Image from "next/image";
import Sidebar from "./componants/utils/Sidebar";
import SavedView from "./componants/routes/SavedView";
export default function Home() {
  return (
    <main className="flex bg-[#1C1C1C]">
      <Sidebar/>
      <SavedView/>
    </main>
  );
}
