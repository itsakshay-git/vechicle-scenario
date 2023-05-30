import "./App.css";
import SideNav from "./components/SideNav/SideNav";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <SideNav />
        <div className="appheader">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
