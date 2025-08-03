import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AddEquipment from "./pages/AddEquipment";
import Tools from "./pages/Tools";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Blog from "./pages/Blog";
import Favorites from "./pages/Favorites";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/add-equipment" element={<AddEquipment />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tool/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
