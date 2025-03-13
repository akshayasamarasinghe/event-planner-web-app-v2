import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import EventDetailsPage from "./pages/Events/Event_Details";
import EventEditPage from "./pages/Events/Edit_Event";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/events" element={<Events />} /> 
      <Route path="/event/:id" element={<EventDetailsPage />} />
      <Route path="/event/create" element={<EventEditPage />} />
      <Route path="/event/edit/:id" element={<EventEditPage />} />
    </Routes>
  );
};

export default AppRoutes;
