import { Analytics } from "@vercel/analytics/react";
import { Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./context/ThemeContext";
import {
  BlogPage,
  BlogPostPage,
  CarnosineGelAustraliaPage,
  IndustryPartnerPage,
  LactigoAustraliaPage,
  LandingPage,
  TopicalCarnosineGelPage,
} from "./pages";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route
            path="/topical-carnosine-gel-australia"
            element={<TopicalCarnosineGelPage />}
          />
          <Route path="/lactigo-australia" element={<LactigoAustraliaPage />} />
          <Route
            path="/carnosine-gel-australia"
            element={<CarnosineGelAustraliaPage />}
          />
          <Route path="/industry-partner" element={<IndustryPartnerPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
      <Analytics />
    </ThemeProvider>
  );
}

export default App;
