import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { useStoreContext } from "../context";
import "./Genres.css";

function Genres() {
    const navigate = useNavigate();
    const { currentUser, toggleState, setToggleState, setSelectedGenre } = useStoreContext();
    const [genresArray] = useState([
        { genre: "Action", id: 28 },
        { genre: "Adventure", id: 12 },
        { genre: "Animation", id: 16 },
        { genre: "Crime", id: 80 },
        { genre: "Family", id: 10751 },
        { genre: "Fantasy", id: 14 },
        { genre: "History", id: 36 },
        { genre: "Horror", id: 27 },
        { genre: "Mystery", id: 9648 },
        { genre: "Sci-Fi", id: 878 },
        { genre: "War", id: 10752 },
        { genre: "Western", id: 37 }
    ]);
    const [filteredGenres, setFilteredGenres] = useState([]);

    useEffect(() => {
        if (!currentUser) {
            return;
        }
        async function fetchUserData() {
            const docRef = doc(firestore, "users", currentUser.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setFilteredGenres(genresArray.filter((g, index) => (docSnap.data().preferredGenres || [])[index]));
            } else {
                setFilteredGenres([]);
                console.log("No user data found.");
            }
        }

        fetchUserData();
    }, [currentUser]);

    function toggleGenre(buttonIdx) {
        const newToggleState = Array(filteredGenres.length).fill(false);
        newToggleState[buttonIdx] = true;
        setToggleState(newToggleState);

        const newSelectedGenre = filteredGenres[buttonIdx].id;
        setSelectedGenre(newSelectedGenre);
        navigate(`/movies/genre/${newSelectedGenre}`);
    }

    return (
        <div className="genre-container">
            <h1 className="genre-msg">Explore a Genre</h1>
            <div className="genre-select">
                {filteredGenres.map((genreSelect, index) => (
                    <button key={genreSelect.id} className={toggleState[index] ? "active-genre" : "inactive-genre"} onClick={() => toggleGenre(index)}>
                        {genreSelect.genre}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Genres;