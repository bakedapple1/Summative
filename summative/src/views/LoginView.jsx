import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useStoreContext } from "../context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./LoginView.css";

function LoginView() {
    const navigate = useNavigate();
    const { userData, setCurrentUser, selectedGenre } = useStoreContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function checkLogin(event) {
        event.preventDefault();

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log(result);
            navigate("/authenticated");
        } catch (error) {
            console.error("Login error:", error.message);
        }
    }

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setCurrentUser(result.user.email);
            console.log("User signed in with Google:", result.user);
            alert("Logged in!");
            navigate(`/movies/genre/${selectedGenre}`);
        } catch (error) {
            console.error("Error signing in with Google:", error);
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
                        <input type="email" name="log-email" id="log-email" className="log-input" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                        <label htmlFor="log-pass" className="log-input-label">Password:</label>
                        <input type="password" name="log-pass" id="log-pass" className="log-input" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                        <input type="submit" form="login-form" value="Sign In" className="log-submit-button" id="log-submit" />
                    </form>
                    <button onClick={googleSignIn} className="register-google">Google Sign In</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LoginView;