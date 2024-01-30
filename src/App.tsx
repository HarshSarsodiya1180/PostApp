import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import PostList from "./components/PostList";
import PostDetails from "./components/PostDetails";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/details/:postId" element={<PostDetails />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
