import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useStoreContext } from "../context";
import ImgNotAvail from "../assets/img not avail.png";
import "./GenreView.css";

function GenreView() {
    const navigate = useNavigate();
    const location = useLocation();
    const param = useParams();
    const { pageNum, setPageNum, cart, setCart, setPrevPage } = useStoreContext();
    const [genreMovies, setGenreMovies] = useState();

    function changePageBy(changeBy) {
        if (pageNum + changeBy < 1) {
            setPageNum(1);
        } else if (pageNum + changeBy > 500) {
            setPageNum(500);
        } else {
            setPageNum(pageNum + changeBy);
        }
    }

    useEffect(() => {
        async function getData() {
            const moviesData = (await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${param.genre_id}&page=${pageNum}`)).data.results;
            setGenreMovies([...moviesData]);
        };

        getData();
    }, [pageNum, param.genre_id]);

    function navigateTo(page) {
        setPrevPage(location.pathname);
        navigate(page);
    }

    return (
        genreMovies && genreMovies.length > 0 ? (
            <div className="genre-view-container">
                <div className="genre-movies">
                    {genreMovies.map(movie => (
                        <div className="gen-mov" key={movie.id}>
                            <img className="gen-mov-poster" src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ImgNotAvail} key={`${movie.id}`} onClick={() => navigateTo(`/movies/details/${movie.id}`)} />
                            <h1 className="gen-mov-label">{`${movie.title}`}</h1>
                            <button className="buy-button" disabled={cart.has(movie.id)} onClick={() => setCart((prevCart) => prevCart.set(movie.id, movie))}>{cart.has(movie.id) ? "Added" : "Buy"}</button>
                        </div>
                    ))}
                </div>
                <div className="pagination" >
                    <button className={(pageNum != 1) ? "active-ten-page-button" : "inactive-ten-page-button"} onClick={() => changePageBy(-10)}>&lt;&lt;</button>
                    <button className={(pageNum != 1) ? "active-page-button" : "inactive-page-button"} onClick={() => changePageBy(-1)}>Prev</button>
                    <div className="page-counter" >Page: {pageNum}</div>
                    <button className={(pageNum != 500) ? "active-page-button" : "inactive-page-button"} onClick={() => changePageBy(1)}>Next</button>
                    <button className={(pageNum != 500) ? "active-ten-page-button" : "inactive-ten-page-button"} onClick={() => changePageBy(10)}>&gt;&gt;</button>
                </div>
            </div>
        ) : (
            <div className="invalid-genre"> Please select a genre!</div>
        )
    );
}

export default GenreView;