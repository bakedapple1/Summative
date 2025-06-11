import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useStoreContext } from "../context";
import SearchIcon from "../assets/search-icon.png";
import "./Header.css";

function Header() {
    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser, setCurrentUser, cart, query, setQuery } = useStoreContext();

    async function logOut() {
        try {
            await signOut(auth);
            setCurrentUser(null);
            alert("Logged out!");
        } catch (error) {
            console.log("Error logging out:", error);
            alert("Logout failed.");
        }
    }

    function handleSearch(event) {
        event.preventDefault();
        console.log(currentUser);
        navigate(`/movies/search`);
    }

    return (
        <div className="nav-bar">
            <div className="logo" onClick={() => navigate(`/`)}>
                BingeBerry
            </div>
            {currentUser &&
                <form className="search-form" id="search-form" onSubmit={(event) => handleSearch(event)}>
                    <input type="text" placeholder="Search movies" value={query} onInput={(event) => setQuery(event.target.value)} />
                    <button type="submit" value="" className="search-submit-button" id="search-submit">
                        <img src={SearchIcon} className="search-icon" />
                    </button>
                </form>
            }

            {currentUser ? (
                <div className="logged-in">
                    <p className="welc-msg">Welcome, {(currentUser.displayName ? currentUser.displayName.split(" ")[0] : "User")}!</p>
                    <button className="cart-button" onClick={() => navigate(`/cart`)}>
                        {`Cart (${cart.size > 99 ? '99+' : cart.size})`}
                    </button>
                    <button className="settings-button" onClick={() => navigate(`/settings`)}>
                        Settings
                    </button>
                    <button className="log-out" onClick={() => logOut()}>
                        Log out
                    </button>
                </div>
            ) : (
                <div className="logged-out">
                    <button className="sign-up" onClick={() => navigate(`/register`)}>
                        Sign up
                    </button>
                    <button className="log-in" onClick={() => navigate(`/login`)}>
                        Log in
                    </button>
                </div>
            )}
        </div>
    );
}

export default Header;