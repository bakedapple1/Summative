import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useStoreContext } from "../context";
import "./Featured.css";

function Featured() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, setPrevPage, cart, setCart, purchaseHistory } = useStoreContext();
    const [sixMovies, setSixMovies] = useState([]);

    useEffect(() => {
        async function getData() {
            const movies = (await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`)).data.results;
            const selectedMovies = new Set();

            while (selectedMovies.size < 6 && movies.length > 0) {
                selectedMovies.add(movies[Math.floor(Math.random() * movies.length)]);
            }
            setSixMovies([...selectedMovies]);
        };

        getData();
    }, []);

    function navigateTo(page) {
        setPrevPage(location.pathname);
        navigate(page);
    }

    return (
        <div className="featured-section">
            <h1 className="featured-header">Featured</h1>
            <div className="featured-movies">
                {sixMovies && sixMovies.map(movie => (
                    <div id="mov" className="mov" key={movie.id}>
                        <img className="movie-poster" onClick={() => navigateTo(`/movies/details/${movie.id}`)} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.id}`} />
                        <h1 className="mov-label">{`${movie.title}`}</h1>
                        {currentUser &&
                            <button className="buy-button" disabled={cart.has(movie.id) || purchaseHistory?.hasOwnProperty(movie.id)} onClick={() => setCart((prevCart) => prevCart.set(movie.id, movie))}>{cart.has(movie.id) ? "Added" : purchaseHistory?.hasOwnProperty(movie.id) ? "Purchased" : "Buy"}</button>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Featured;