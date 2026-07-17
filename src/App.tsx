import { Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { BlogPage, BlogPostPage, LandingPage, TopicalCarnosineGelPage, LactigoAustraliaPage } from "./pages";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/topical-carnosine-gel-australia" element={<TopicalCarnosineGelPage />} />
          <Route path="/lactigo-australia" element={<LactigoAustraliaPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
