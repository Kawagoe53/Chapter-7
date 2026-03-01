import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostsDetail from "./Components/PostsDetail.js";
import Posts from "./Components/Posts.js";
import Header from "./Components/Header.js";
import ContactForm from "./Components/ContactForm.js";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:id" element={<PostsDetail />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
    </BrowserRouter>
  );
}
