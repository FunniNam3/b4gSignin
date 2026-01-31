import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboardPage";
import Auth from "./pages/authPage";
import { Landing } from "./pages/landingPage";
import PrivateRoute from "./components/privateRoute";
import { Navigation } from "./components/navigation";
import { TeamSearch } from "./pages/teamSearchPage";
import { JoinTeam } from "./components/teams/joinTeam";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/teamSearch" element={<TeamSearch />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/joinTeam" element={<JoinTeam />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
