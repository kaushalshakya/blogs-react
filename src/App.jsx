import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ViewPosts from './components/post/ViewPosts';
import LoginForm from './components/auth/LoginForm';
import Navbar from './components/Navbar';
import RegisterForm from './components/auth/RegisterForm';
import AddPost from './components/post/AddPost';

export default function App() {
  return (
    <div data-theme="dark">
      <Router>
        <ConditionalNavbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<ViewPosts />} />
          <Route path='/register' element = {<RegisterForm />} />
          <Route path='/post' element = {<AddPost />} />
        </Routes>
      </Router>
    </div>
  );
}

function ConditionalNavbar() {
  let location = useLocation();
  
  // Do not show the Navbar when the path is '/login' or '/register'
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }
  
  return <Navbar />;
}
