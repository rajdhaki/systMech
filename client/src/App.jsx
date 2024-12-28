import {createBrowserRouter, RouterProvider, useLocation, useNavigate} from "react-router-dom";
import { useEffect } from 'react';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Expertise from "./pages/Expertise";
import Service from "./pages/Service";
import Blog from "./pages/Blog";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import AllBlog from "./pages/AllBlog";
import BlogPost from "./pages/BlogPost";
import AdminNavbar from "./components/AdminNavbar";
import EditBlog from "./pages/EditBlog"; // Import the new component
import Testmonials from "./pages/Testmonials";


const ScrollToHashElement = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
};

const HomePage = () => (
  <>
    <Navbar />
    <Home />
    <About id="about" />
    <Service id="services" />
    <Expertise id="expertise" />
    <Blog id="blog" />
    <Contact id="contact" />
    {/* <Testmonials/> */}
    <ScrollToHashElement />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/blogs",
    element: (
      <>
        <Navbar />
        <AllBlog />
      </>
    ),
  },

  {
    path: "/blog/:id",
    element: (
      <>
        <Navbar />
        <BlogPost />
      </>
    ),
  },
  {
    path: "/admin",
    element: (
      <Login />
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <>
      <AdminNavbar/>
      <AddBlog />
      </>
    ),
  },
  {
    path: "/admin/edit-blog",
    element: (
      <>
        <AdminNavbar />
        <EditBlog />
      </>
    ),
  }
]);

function App() {
  console.log(import.meta.env.VITE_BACKEND_URL)
  return (
    <div className="overflow-x-hidden">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
