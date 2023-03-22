import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Home,
  Books,
  BookDetails,
  BookTagSearch,
  Cart,
  NavBar,
  Login,
  Register,
  Profile,
  Footer,
  BookForm,
  ViewUsers,
  ViewUserCart,
} from "./components/exports";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";

export const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const App = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  return (
    <>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<BookDetails />} />
        <Route path="/booktag/:tagName" element={<BookTagSearch />} />
        <Route
          path="/cart"
          element={<Cart />}
          onLeave={() => {
            console.log("hi");
          }}
        />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route
          path="/register"
          element={<Register setLoggedIn={setLoggedIn} />}
        />
        <Route path="/me" element={<Profile />} />
        <Route path="/bookForm/:bookId" element={<BookForm />} />
        <Route path="/me/viewUsers" element={<ViewUsers />} />
        <Route path="/me/viewUsers/:userId" element={<ViewUserCart />} />
      </Routes>
      <Footer />
    </>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <SnackbarProvider autoHideDuration={1500}>
      <App />
    </SnackbarProvider>
  </BrowserRouter>
);
