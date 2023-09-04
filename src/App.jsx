import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewPosts from "./components/post/ViewPosts";
import LoginForm from "./components/auth/LoginForm";

function App() {
  return (
    <div data-theme="dark">
      <Router>
        <Routes>
          <Route path="/" Component={ViewPosts} />
          <Route path="/login" Component={LoginForm} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
