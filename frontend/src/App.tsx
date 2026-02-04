import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboardPage";
import Auth from "./pages/authPage";
import { Landing } from "./pages/landingPage";
import PrivateRoute from "./components/privateRoute";
import { Navigation } from "./components/navigation";
import { TeamSearch } from "./pages/teamSearchPage";
import { UpdateTeam } from "./pages/updateTeamPage";
import { TeamDashboard } from "./pages/teamDashboard";
import { UserPage } from "./pages/userPage";
import { FAQPage } from "./pages/FAQPage";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/teamSearch" element={<TeamSearch />} />
        <Route path="/FAQ" element={<FAQPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/updateTeam" element={<UpdateTeam />} />
          <Route path="/team" element={<TeamDashboard />} />
          <Route path="/user" element={<UserPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
