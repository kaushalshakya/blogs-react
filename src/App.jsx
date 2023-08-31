import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewPosts from "./components/post/ViewPosts";

function App() {
  const API = import.meta.env.VITE_API_URL;
  console.log(API + '/posts');
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={ViewPosts} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
