import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStoreContext } from "../context";
import ImgNotAvail from "../assets/img not avail.png";
import "./DetailView.css";

function DetailView() {
    const navigate = useNavigate();
    const param = useParams();
    const { prevPage } = useStoreContext();
    const [movie, setMovie] = useState([]);
    const [trailer, setTrailer] = useState();

    useEffect(() => {
        async function getData() {
            const movieData = (await axios.get(`https://api.themoviedb.org/3/movie/${param.id}?api_key=${import.meta.env.VITE_TMDB_KEY}`)).data;
            setMovie(movieData);
        };

        getData();
    }, [param.id]);

    useEffect(() => {
        async function getTrailer() {
            const trailers = (await axios.get(`https://api.themoviedb.org/3/movie/${param.id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}`)).data.results.filter(vid => vid.type === "Trailer" && vid.site === "YouTube");
            if (trailers.length > 0) {
                setTrailer(trailers[0].key);
            }
        }

        getTrailer();
    }, [movie]);

    return (
        <>
            <div className="mov-details">
                <div className="mov-details-header">
                    <h1 className="mov-title">{movie.title}</h1>
                    <div className="mov-tagline">{movie.tagline}</div>
                </div>
                <div className="mov-details-content">
                    <img className="mov-poster" src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ImgNotAvail} />
                    <div className=" mov-column-two">
                        <div className="mov-release-date">Released: {movie.release_date}</div>
                        <div className="mov-runtime">Runtime: {movie.runtime}min</div>
                        <div className="mov-genres">Genres:</div>
                        <ul className="mov-genre-list">
                            {movie.genres && movie.genres.map(genre => (
                                <li className="mov-genre" key={genre.id}>{genre.name}</li>
                            ))}
                        </ul>
                        <div className="mov-languages">Spoken Languages:</div>
                        <ul className="mov-lang-list">
                            {movie.spoken_languages && movie.spoken_languages.length > 0 ? movie.spoken_languages.map(language => (
                                <li className="mov-language" key={language.english_name}>{language.english_name}</li>
                            )) :
                                <li className="mov-language">Unknown</li>
                            }
                        </ul>
                    </div>
                </div>
                <iframe className="mov-trailer" src={`https://www.youtube.com/embed/${trailer}`} frameborder="0" allowFullScreen></iframe>
            </div>
            <div className="return-movies" onClick={() => navigate(prevPage)}>&times;</div>
        </>
    );
}

export default DetailView;