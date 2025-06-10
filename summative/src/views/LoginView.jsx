import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from '../firebase';
import { useStoreContext } from "../context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./LoginView.css";

function LoginView() {
    const navigate = useNavigate();
    const { setCurrentUser, selectedGenre } = useStoreContext();
    const [logEmail, setLogEmail] = useState("");
    const [logPassword, setLogPassword] = useState("");

    async function checkLogin(event) {
        event.preventDefault();

        try {
            const result = await signInWithEmailAndPassword(auth, logEmail, logPassword);
            setCurrentUser(result.user);
            navigate(`/movies/genre/${selectedGenre}`);
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                alert("Email or password is incorrect.");
                setLogPassword('');
            } else {
                alert("An error occurred during login. Please try again.");
                setLogPassword('');
            }
        }
    }

    const googleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const docRef = doc(firestore, "users", result.user.email);
            const docSnap = await getDoc(docRef);
            setCurrentUser(result.user);
            if (!docSnap.exists()) {
                const data = { preferredGenres: Array(5).fill(true).concat(Array(7).fill(false)) };
                const docRef = doc(firestore, "users", result.user.email);
                await setDoc(docRef, data);
            } else {
                console.log("LoginView.jsx GoogleSignIn error");
            }
            navigate(`/movies/genre/${selectedGenre}`);
        } catch (error) {
            console.log("Error signing in with Google:", error);
        }
    }

    return (
        <div className="login-view">
            <Header />
            <div className="login">
                <div className="login-menu">
                    <h1 className="login-label">Log In</h1>
                    <form className="login-form" id="login-form" onSubmit={(event) => { checkLogin(event) }}>
                        <label htmlFor="log-email" className="log-input-label">Email:</label>
                        <input type="email" name="log-email" id="log-email" className="log-input" value={logEmail} onChange={(event) => { setLogEmail(event.target.value) }} required />
                        <label htmlFor="log-pass" className="log-input-label">Password:</label>
                        <input type="password" name="log-pass" id="log-pass" className="log-input" value={logPassword} onChange={(event) => { setLogPassword(event.target.value) }} required />
                        <input type="submit" form="login-form" value="Sign In" className="log-submit-button" id="log-submit" />
                    </form>
                    <button onClick={googleSignIn} className="google-signin">Sign In With Google</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LoginView;