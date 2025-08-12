// Outlet is a component from react-router-dom v6.
// It's a placeholder where nested child routes will be rendered
import { Outlet } from "react-router-dom";
// ToastContainer is part of the react-toastify library, which shows popup notifications (toasts).
// The CSS file is imported to apply default styles to the toast messages.
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// This imports a custom component called Navigation, likely a navigation bar (e.g., top menu, header, or sidebar).
import Navigation from "./pages/Auth/Navigation";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
};

export default App;