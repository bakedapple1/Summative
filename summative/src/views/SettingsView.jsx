import { useState } from "react";
import { useStoreContext } from "../context/index.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "./SettingsView.css";

function SettingsView() {
    const { userData, setUserData, currentUser, preferredGenres, setPreferredGenres, setPageNum, setToggleState, setSelectedGenre } = useStoreContext();
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newPreferredGenres, setnewPreferredGenres] = useState(preferredGenres);
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

    function updateAccount(event) {
        event.preventDefault();
        console.log(userData);
        if (newPreferredGenres.filter(Boolean).length < 5) {
            alert("Please select at least 5 genres.");
        } else {
            alert("Account updated.")
            setPreferredGenres(newPreferredGenres);
            setUserData((prev) => {
                return prev.set(currentUser, {
                    ...prev.get(currentUser),
                    firstName: newFirstName || prev.get(currentUser).firstName,
                    lastName: newLastName || prev.get(currentUser).lastName
                });
            });
            setNewFirstName("");
            setNewLastName("");
            setPageNum(1);
            setToggleState(Array(12).fill(false));
            setSelectedGenre("*");
        }
    }

    function changePreferences(index) {
        const newPreferences = [...newPreferredGenres];
        newPreferences[index] = !newPreferences[index];
        setnewPreferredGenres(newPreferences);
    }

    return (
        <div className="settings-view-container">
            <Header />
            <div className="settings-container">
                <h1 className="settings-title">Settings</h1>
                <form className="settings-form" id="settings-form" onSubmit={(event) => { updateAccount(event) }}>
                    <div className="set-email">{`Email: ${userData.get(currentUser).email}`}</div>
                    <label htmlFor="set-first-name" className="set-input-label">First Name:</label>
                    <input type="text" name="set-first-name" className="set-input" id="set-first-name" placeholder={userData.get(currentUser).firstName} value={newFirstName} onChange={(event) => { setNewFirstName(event.target.value) }} />
                    <label htmlFor="set-last-name" className="set-input-label">Last Name:</label>
                    <input type="text" name="set-last-name" className="set-input" id="set-last-name" placeholder={userData.get(currentUser).lastName} value={newLastName} onChange={(event) => { setNewLastName(event.target.value) }} />
                </form>

                <div className="set-genre-container">
                    <h2 className="set-select-label">Select Genres</h2>
                    <div className="set-subtitle">&#40;Select at least 5 genres&#41;</div>
                    <div className="set-checkbox-list">
                        {genresArray.map((genreCheck, index) => (
                            <div className="set-genres" key={`set-check-cont-${genreCheck.id}`}>
                                <label htmlFor={`check-${genreCheck.id}`} key={`set-label-${genreCheck.id}`} className="set-genre-labels">{genreCheck.genre}</label>
                                <input checked={newPreferredGenres[index]} type="checkbox" key={`set-check-${genreCheck.id}`} id={`check-${genreCheck.id}`} className="set-checkboxes" onChange={() => changePreferences(index)} />
                            </div>
                        ))}
                    </div>
                </div>
                <input form="settings-form" className="set-save-button" type="submit" value="Save" />
            </div>
            <Footer />
        </div>
    );
}

export default SettingsView;