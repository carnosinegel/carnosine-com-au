import { Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { BlogPage, BlogPostPage, LandingPage } from "./pages";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
