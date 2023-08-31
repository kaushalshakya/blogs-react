import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewPosts from "./components/post/ViewPosts";

function App() {
  return (
    <div className="bg-default text-default">
      <Router>
        <Routes>
          <Route path="/" Component={ViewPosts} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
