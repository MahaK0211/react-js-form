import React from "react";
import SampleForm from "./pages/SampleForm";
import { Route, Routes } from "react-router-dom";
import Tabel from "./pages/sampleform/Tabel";
import SampleAirbnbSite from "./pages/SampleAirbnbSite";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import FileInput from "./pages/sampleform/FileInput";
import SampleCURD from "./pages/sampleform/SampleCURD";
import HooksConcepts from "./pages/react-hooks/HooksConcepts";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<SampleForm />} />
        <Route path="/tabel" element={<Tabel />} />
        <Route path="/sample" element={<SampleAirbnbSite />} />
        <Route path="file" element={<FileInput />} />
        <Route path="curd" element={<SampleCURD />} />
        <Route path="hooks" element={<HooksConcepts />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
// import { Route, Routes } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";
// import AdminPage from "./pages/AdminPage";
// import UserDetailPage from "./pages/UserPage";
// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/admin" element={<AdminPage />} />
//         <Route path="/user" element={<UserDetailPage />} />
//       </Routes>
//     </div>
//   );
// }
// export default App;
// import React from "react";
// import { RoleProvider, useRole } from "./pages/context/RoleContext";
// import Login from "./pages/LoginPage";
// import SuperAdminPanel from "./pages/SuperAdmin";
// import AdminPanel from "./pages/AdminPage";
// import UserPanel from "./pages/UserPage";

// function RoleBasedApp() {
//   const { currentUser } = useRole();

//   if (!currentUser) {
//     return <Login />;
//   }

//   if (currentUser.role === "superadmin") return <SuperAdminPanel />;
//   if (currentUser.role === "admin") return <AdminPanel />;
//   if (currentUser.role === "user") return <UserPanel />;

//   return null;
// }

// export default function App() {
//   return (
//     <RoleProvider>
//       <RoleBasedApp />
//     </RoleProvider>
//   );
// }
