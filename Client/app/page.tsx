import Sidebar from "./componants/utils/Sidebar";
import SavedView from "./componants/routes/SavedView";
import AuthWrapper from "./componants/utils/AuthWrapper";
export default function Home() {
  return (
    <AuthWrapper>
      <main className="flex bg-[#1C1C1C]">
        <Sidebar/>
        <SavedView/>
      </main>
    </AuthWrapper>
  );
}
