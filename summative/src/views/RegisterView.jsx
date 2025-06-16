import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore, auth } from "../firebase";
import { useStoreContext } from "../context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./RegisterView.css";

function RegisterView() {
    const [selectedGenres, setSelectedGenres] = useState(Array(12).fill(false));
    const navigate = useNavigate();
    const { setCurrentUser, selectedGenre } = useStoreContext();
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confPass: ''
    });
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

    function setPreferences(idx) {
        setSelectedGenres(prev => {
            const newSelected = [...prev];
            newSelected[idx] = !newSelected[idx];
            return newSelected;
        });
    }

    async function createUserDoc(result, genres) {
        const data = { preferredGenres: genres };
        const docRef = doc(firestore, "users", result.user.email);
        await setDoc(docRef, data);
    }

    async function createAccount(event) {
        event.preventDefault();

        if (userInfo.password !== userInfo.confPass) {
            alert("Passwords do not match!");
            setUserInfo((prev) => ({ ...prev, password: '', confPass: '' }));
            return;
        }
        if (selectedGenres.filter(Boolean).length < 5) {
            alert("Please select at least 5 genres.");
            return;
        }

        try {
            if (userInfo.firstName.length + userInfo.lastName.length > 256) {
                alert("Please use a shorter name.");
                return;
            }
            const result = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
            await updateProfile(result.user, {
                displayName: `${userInfo.firstName} ${userInfo.lastName}`
            });
            createUserDoc(result, selectedGenres);
            setCurrentUser(result.user);
            alert("Account successfully created.");
            navigate(`/movies/genre/${selectedGenre}`);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("This email is already registered!");
                setUserInfo((prev) => ({ ...prev, firstName: '', lastName: '', email: '', password: '', confPass: '' }));
            } else if (error.code === 'auth/weak-password') {
                alert("Password must be at least 6 characters long.");
                setUserInfo((prev) => ({ ...prev, password: '', confPass: '' }));
            } else if (error.code === 'auth/invalid-email') {
                alert("Invalid email address.");
                setUserInfo((prev) => ({ ...prev, email: '' }));
            } else {
                console.log("Error creating account:", error);
                alert("An error occurred while creating your account. Please try again.");
            }
        }
    }

    const googleRegister = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            createUserDoc(result, Array(5).fill(true).concat(Array(7).fill(false)));
            setCurrentUser(result.user);
            navigate(`/movies/genre/${selectedGenre}`);
        } catch (error) {
            console.log("Error signing in with Google:", error);
        }
    }

    return (
        <div className="register-view">
            <Header />
            <div className="register">
                <div className="register-menu">
                    <h1 className="register-label">Sign Up</h1>
                    <div className="register-form-container">
                        <form className="register-form" id="register-form" onSubmit={(event) => { createAccount(event) }}>
                            <label htmlFor="reg-first-name" className="reg-input-label">First Name:</label>
                            <input type="text" name="reg-first-name" className="reg-input" id="reg-first-name" value={userInfo.firstName} onChange={(event) => { setUserInfo((prev) => ({ ...prev, firstName: event.target.value })) }} required />
                            <label htmlFor="reg-last-name" className="reg-input-label">Last Name:</label>
                            <input type="text" name="reg-last-name" className="reg-input" id="reg-last-name" value={userInfo.lastName} onChange={(event) => { setUserInfo((prev) => ({ ...prev, lastName: event.target.value })) }} required />
                            <label htmlFor="reg-email" className="reg-input-label">Email:</label>
                            <input type="email" name="reg-email" className="reg-input" id="reg-email" value={userInfo.email} onChange={(event) => { setUserInfo((prev) => ({ ...prev, email: event.target.value })) }} required />
                            <label htmlFor="reg-pass" className="reg-input-label">Password:</label>
                            <input type="password" name="reg-pass" className="reg-input" id="reg-pass" value={userInfo.password} onChange={(event) => { setUserInfo((prev) => ({ ...prev, password: event.target.value })) }} required />
                            <label htmlFor="reg-conf-pass" className="reg-input-label">Confirm Password:</label>
                            <input type="password" name="reg-conf-pass" className="reg-input" id="reg-conf-pass" value={userInfo.confPass} onChange={(event) => { setUserInfo((prev) => ({ ...prev, confPass: event.target.value })) }} required />
                        </form>
                    </div>

                    <div className="reg-genre-container">
                        <h1 className="reg-select-label">Select Genres</h1>
                        <div className="reg-subtitle">&#40;Select at least 5 genres&#41;</div>
                        <div className="reg-checkbox-list">
                            {genresArray.map((genreCheck, index) => (
                                <div className="reg-genres" key={`reg-check-cont-${genreCheck.id}`}>
                                    <label htmlFor={`check-${genreCheck.id}`} key={`reg-label-${genreCheck.id}`} className="reg-genre-labels">{genreCheck.genre}</label>
                                    <input checked={selectedGenres[index]} type="checkbox" key={`reg-check-${genreCheck.id}`} id={`check-${genreCheck.id}`} className="reg-checkboxes" onChange={() => setPreferences(index)} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <input type="submit" form="register-form" value="Register" className="reg-submit-button" id="reg-submit" />
                    <button onClick={googleRegister} className="google-register">Register With Google</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RegisterView;