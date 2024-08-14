import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Books from './components/Books';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddStudent from './components/AddStudent';
import Logout from './components/Logout';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import DeleteBook from './components/DeleteBook';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [role, setRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8001/auth/verify')
      .then(res => {
        if (res.data.login) {
          setRole(res.data.role);
          setIsAuthenticated(true);
        } else {
          setRole('');
          setIsAuthenticated(false);
        }
        console.log(res);
      }).catch(err => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books role={role} />} />
        <Route path="/login" element={<Login setRoleVar={setRole} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/logout" element={<Logout setRole={setRole} />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/book/:id" element={<EditBook />} />
        <Route path="/delete/:id" element={<DeleteBook />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
