import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import ImgNotAvail from "../assets/img not avail.png";
import "./SearchView.css";

function SearchView() {
    const navigate = useNavigate();
    const location = useLocation();
    const { searchPageNum, setSearchPageNum, cart, setCart, query, setPrevPage } = useStoreContext();
    const [searchRes, setSearchRes] = useState([]);
    const [waitMsg, setWaitMsg] = useState([]);

    useEffect(() => {
        if (!query) {
            setSearchRes([]);
            setWaitMsg(["No results found...", "Please check your search term."]);
            return;
        }
        setSearchRes([]);
        setWaitMsg(["Fetching Movies..."]);
        const timer = setTimeout(() => {
            async function getData() {
                const queryRes = (await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${query}&include_adult=false&language=en-US&page=1&page=${searchPageNum}`)).data.results;
                setSearchRes([...queryRes]);
                if ([...queryRes].length > 0) {
                    setWaitMsg("");
                } else {
                    setWaitMsg(["No results found...", "Please check your search term."]);
                }
            };

            getData();
        }, 400);

        return () => clearTimeout(timer);
    }, [searchPageNum, query]);


    function changePageBy(changeBy) {
        if (searchPageNum + changeBy < 1) {
            setSearchPageNum(1);
        } else if (searchPageNum + changeBy > 500) {
            setSearchPageNum(500);
        } else {
            setSearchPageNum(searchPageNum + changeBy);
        }
    }

    function navigateTo(page) {
        setPrevPage(location.pathname);
        navigate(page);
    }

    return (
        <div>
            {searchRes && searchRes.length > 0 ? (
                <div className="search-view-container">
                    <div className="search-movies">
                        {searchRes.map(movie => (
                            <div className="search-mov" key={movie.id}>
                                <img className="search-mov-poster" src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ImgNotAvail} key={`${movie.id}`} onClick={() => navigateTo(`/movies/details/${movie.id}`)} />
                                <h1 className="search-mov-label">{`${movie.title}`}</h1>
                                <button className="search-buy-button" disabled={cart.has(movie.id)} onClick={() => setCart((prevCart) => prevCart.set(movie.id, movie))}>{cart.has(movie.id) ? "Added" : "Buy"}</button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="fetching-msg">
                    {waitMsg.map((line, index) => (
                        <span key={index}>
                            {line}
                            {index < waitMsg.length - 1 && <br />}
                        </span>
                    ))}
                </div>
            )}
            <div div className="pagination" id="search-pag" >
                <button className={(searchPageNum != 1) ? "active-ten-page-button" : "inactive-ten-page-button"} onClick={() => changePageBy(-10)}>&lt;&lt;</button>
                <button className={(searchPageNum != 1) ? "active-page-button" : "inactive-page-button"} onClick={() => changePageBy(-1)}>Prev</button>
                <div className="page-counter" >Page: {searchPageNum}</div>
                <button className={(searchPageNum != 500) ? "active-page-button" : "inactive-page-button"} onClick={() => changePageBy(1)}>Next</button>
                <button className={(searchPageNum != 500) ? "active-ten-page-button" : "inactive-ten-page-button"} onClick={() => changePageBy(10)}>&gt;&gt;</button>
            </div >
        </div>
    );
}

export default SearchView;