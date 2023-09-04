import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ViewPosts from './components/post/ViewPosts';
import LoginForm from './components/auth/LoginForm';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div data-theme="dark">
      <Router>
        <ConditionalNavbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<ViewPosts />} />
        </Routes>
      </Router>
    </div>
  );
}

function ConditionalNavbar() {
  let location = useLocation();
  
  // Do not show the Navbar when the path is '/login'
  if (location.pathname === '/login') {
    return null;
  }
  
  return <Navbar />;
}
