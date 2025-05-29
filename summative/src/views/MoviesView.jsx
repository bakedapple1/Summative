import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Genres from "../components/Genres";
import Footer from "../components/Footer";
import "./MoviesView.css";

function MoviesView() {

    return (
        <div className="movies-view-container">
            <Header />
            <div className="genres">
                <Genres />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default MoviesView;