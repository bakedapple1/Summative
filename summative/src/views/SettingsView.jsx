import { useEffect, useState } from "react";
import { useStoreContext } from "../context/index.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile, updatePassword } from "firebase/auth";
import { auth, firestore } from "../firebase";
import ImgNotAvail from "../assets/img not avail.png";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "./SettingsView.css";


function SettingsView() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, setCurrentUser, setPageNum, setToggleState, selectedGenre, setSelectedGenre, setPrevPage, purchaseHistory } = useStoreContext();
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [preferredGenres, setPreferredGenres] = useState([]);
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

    useEffect(() => {
        if (!currentUser) {
            return;
        }
        async function fetchPreferredGenres() {
            const docRef = doc(firestore, "users", currentUser.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setPreferredGenres(docSnap.data().preferredGenres || Array(12).fill(false));
            } else {
                setPreferredGenres(Array(12).fill(false));
            }
        }

        fetchPreferredGenres();
    }, [currentUser]);

    async function updateUser() {
        try {
            const data = { preferredGenres: preferredGenres, previousPurchases: purchaseHistory };
            const docRef = doc(firestore, "users", currentUser.email);
            await setDoc(docRef, data);
            await updateProfile(currentUser, {
                displayName: `${newFirstName || currentUser.displayName.split(" ")[0]} ${newLastName || currentUser.displayName.split(" ")[1]}`
            });
            if (newPassword) {
                await updatePassword(currentUser, newPassword);
            }
            await auth.currentUser.reload();
            setCurrentUser(auth.currentUser);
            alert("Account updated.")
        } catch (error) {
            if (error.code == "auth/weak-password") {
                alert("Password must be at least 6 characters long.");
            } else {
                alert("Unexpected error occurred.");
                console.error("Error updating account:", error);
            }
        }
    }

    async function handleUpdate(event) {
        event.preventDefault();

        if (preferredGenres.filter(Boolean).length < 5) {
            alert("Please select at least 5 genres.");
        } else {
            await updateUser();
            setPageNum(1);
            setNewFirstName("");
            setNewLastName("");
            setNewPassword("");
            setToggleState(Array(12).fill(false));
            setSelectedGenre("*");
        }
    }

    function changePreferences(index) {
        const newPreferences = [...preferredGenres];
        newPreferences[index] = !newPreferences[index];
        setPreferredGenres(newPreferences);
    }

    function navigateTo(page) {
        setPrevPage(location.pathname);
        navigate(page);
    }

    return (
        <div className="settings-view-container">
            <Header />
            <div className="settings-container">
                <h1 className="settings-title">Settings</h1>
                <form className="settings-form" id="settings-form" onSubmit={(event) => { handleUpdate(event) }}>
                    <div className="set-email">{`Email: ${currentUser.email}`}</div>
                    <label htmlFor="set-first-name" className="set-input-label">First Name:</label>
                    <input type="text" name="set-first-name" className="set-input" id="set-first-name" placeholder={currentUser.displayName.split(" ")[0]} value={newFirstName} onChange={(event) => { setNewFirstName(event.target.value) }} />
                    <label htmlFor="set-last-name" className="set-input-label">Last Name:</label>
                    <input type="text" name="set-last-name" className="set-input" id="set-last-name" placeholder={currentUser.displayName.split(" ")[1]} value={newLastName} onChange={(event) => { setNewLastName(event.target.value) }} />
                    {currentUser && currentUser.providerData[0].providerId === "password" &&
                        <div className="set-password-container">
                            <label htmlFor="set-password" className="set-input-label">Password:</label>
                            <input type="password" name="set-password" className="set-input" id="set-password" placeholder="Enter new password" value={newPassword} onChange={(event) => { setNewPassword(event.target.value) }} />
                        </div>
                    }
                </form>

                <div className="set-genre-container">
                    <h2 className="set-select-label">Select Genres</h2>
                    <div className="set-subtitle">&#40;Select at least 5 genres&#41;</div>
                    <div className="set-checkbox-list">
                        {genresArray.map((genreCheck, index) => (
                            <div className="set-genres" key={`set-check-cont-${genreCheck.id}`}>
                                <label htmlFor={`check-${genreCheck.id}`} key={`set-label-${genreCheck.id}`} className="set-genre-labels">{genreCheck.genre}</label>
                                <input checked={preferredGenres[index] === true} type="checkbox" key={`set-check-${genreCheck.id}`} id={`check-${genreCheck.id}`} className="set-checkboxes" onChange={() => changePreferences(index)} />
                            </div>
                        ))}
                    </div>
                </div>
                <input form="settings-form" className="set-save-button" type="submit" value="Save" />

                <div className="set-prev-purchases-container">
                    <h2 className="set-prev-purchases">Previous Purchases</h2>
                    {!purchaseHistory ? (
                        <div className="set-no-purchases">You have no previous purchases.</div>
                    ) : (
                        <div className="set-movies">
                            {Object.values(purchaseHistory).map(movie => (
                                <div className="set-mov" key={movie.id}>
                                    <img className="set-mov-poster" src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ImgNotAvail} key={`${movie.id}`} onClick={() => navigateTo(`/movies/details/${movie.id}`)} />
                                    <h1 className="set-mov-label">{`${movie.title}`}</h1>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div >
            <div className="set-return" onClick={() => navigate(`/movies/genre/${selectedGenre}`)}>&times;</div>
            <Footer />
        </div >
    );
}

export default SettingsView;