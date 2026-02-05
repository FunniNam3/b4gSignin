import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboardPage";
import Auth from "./pages/authPage";
import { Landing } from "./pages/landingPage";
import PrivateRoute from "./components/privateRoute";
import { Navigation } from "./components/navigation";
import { TeamSearch } from "./pages/teamSearchPage";
import { UpdateUserTeam } from "./pages/updateUserTeamPage";
import { TeamDashboard } from "./pages/teamDashboard";
import { UserPage } from "./pages/userPage";
import { FAQPage } from "./pages/FAQPage";
import { Footer } from "./components/footer";
import { EditUserPage } from "./pages/editUserPage";

function App() {
  return (
    <div className="h-fit min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/teamSearch" element={<TeamSearch />} />
          <Route path="/FAQ" element={<FAQPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/updateTeam" element={<UpdateUserTeam />} />
            <Route path="/team" element={<TeamDashboard />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/editUser" element={<EditUserPage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
