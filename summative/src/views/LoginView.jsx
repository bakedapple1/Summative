import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./LoginView.css";

function LoginView() {
    const navigate = useNavigate();
    const { userData, setCurrentUser, selectedGenre } = useStoreContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function checkLogin(event) {
        event.preventDefault();
        const user = userData.get(email);

        if (user && user.password == password) {
            setCurrentUser(email);
            alert("Logged in!");
            navigate(`/movies/genre/${selectedGenre}`);
        } else {
            alert("Email or password is wrong.");
            setPassword("");
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
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LoginView;