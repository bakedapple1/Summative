import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from 'firebase/auth'
import { auth } from '../firebase';
import { useStoreContext } from "../context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./LoginView.css";

function LoginView() {
    const navigate = useNavigate();
    const { setCurrentUser, selectedGenre } = useStoreContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function checkLogin(event) {
        event.preventDefault();

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setCurrentUser(result.user);
            navigate(`/movies/genre/${selectedGenre}`);
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                alert("Email or password is incorrect.");
                setPassword('');
            } else {
                alert("An error occurred during login. Please try again.");
                setPassword('');
            }
        }
    }

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const methods = await fetchSignInMethodsForEmail(auth, result.user.email);

            if (methods.length === 0) {
                await result.user.delete();
                alert("Please register first before signing in.");
            } else {
                setCurrentUser(result.user);
                navigate(`/movies/genre/${selectedGenre}`);
            }
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
                        <input type="email" name="log-email" id="log-email" className="log-input" value={email} onChange={(event) => { setEmail(event.target.value) }} required />
                        <label htmlFor="log-pass" className="log-input-label">Password:</label>
                        <input type="password" name="log-pass" id="log-pass" className="log-input" value={password} onChange={(event) => { setPassword(event.target.value) }} required />
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