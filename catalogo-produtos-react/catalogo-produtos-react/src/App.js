import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import NewProduct from "./pages/NewProduct";
import Header from "./components/Header";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<ProductPage />} />
        <Route path="/novo" element={<NewProduct />} />
         <Route path="/editar/:id" element={<EditProduct />} /> 
      </Routes>
    </Router>
  );
}

export default App;
