import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const API = import.meta.env.VITE_API_URL;
  console.log(API + '/posts');
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
