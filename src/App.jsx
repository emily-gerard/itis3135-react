import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import IntroductionPage from "./pages/IntroductionPage";
import SurveyPage from "./pages/SurveyPage";
import CardsPage from "./pages/CardsPage";
import InventoryPage from "./pages/InventoryPage";
import DocumentationPage from "./pages/DocumentationPage";
import ProductPage from "./pages/ProductPage";
import IntroFormPage from "./pages/IntroFormPage";
import ContractPage from "./pages/ContractPage";
import CatSlideshow from "./pages/CatSlideshow";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/introduction" element={<IntroductionPage />} />
          <Route path="/projects/survey" element={<SurveyPage />} />
          <Route path="/projects/cards" element={<CardsPage />} />
          <Route path="/projects/inventory" element={<InventoryPage />} />
          <Route
            path="/projects/documentation"
            element={<DocumentationPage />}
          />
          <Route path="/projects/product" element={<ProductPage />} />
          <Route path="/intro-form" element={<IntroFormPage />} />
          <Route path="/contract" element={<ContractPage />} />
          <Route path="/cat-slideshow" element={<CatSlideshow />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
