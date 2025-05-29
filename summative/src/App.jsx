import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context";
import DetailView from "./views/DetailView.jsx";
import ErrorView from "./views/ErrorView.jsx";
import GenreView from "./views/GenreView.jsx";
import HomeView from './views/HomeView.jsx';
import LoginView from './views/LoginView.jsx';
import MoviesView from "./views/MoviesView.jsx";
import ProtectedRoutes from "./views/ProtectedRoutes.jsx";
import RegisterView from './views/RegisterView.jsx';
import CartView from "./views/CartView.jsx";
import SettingsView from "./views/SettingsView.jsx";
import SearchView from "./views/SearchView.jsx";
import './App.css';

function App() {

  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/movies" element={<MoviesView />} >
              <Route path="genre/:genre_id" element={<GenreView />} />
              <Route path="details/:id" element={<DetailView />} />
              <Route path="search" element={<SearchView />} />
            </Route>
            <Route path="/cart" element={<CartView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Route>
          <Route path="*" element={<ErrorView />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App;